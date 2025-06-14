import { collection,doc,getDocs,getDoc, Timestamp } from "firebase/firestore";   
import { db } from "../firebase/config"; // Asegúrate de importar tu configuración de Firebase correctamente

export type Obras = {
id: string;
nombre: string | null;
PDT: string | null;
fechaFirmaContrato: string  | null;
Comitente: string | null;
Estado: string | null;
Ubicacion: string | null;
}
export async function obtenerObras(id?:string): Promise<Obras | Obras[] | null> {

if(id!== undefined){
    const docRef = doc(db, "Obras", id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()){
        const data = snapshot.data();
       

        return {
            id: snapshot.id,
            nombre: data.Nombre || null,
            PDT: data.NCarpeta || null,
            fechaFirmaContrato: data.Fechafirmacontrato,
         Comitente: data.Comitente || null,
         Estado: data.Estado || null,
         Ubicacion: data.Ubicacion || null,
          };
    }
    else{
        console.log("No existe la obra con el ID proporcionado.");
        return null;
    }
    
}else{
    const obrasCollection = collection(db, "Obras");
    const querySnapshot = await getDocs(obrasCollection);
if(querySnapshot.empty) {
    console.log("No hay obras disponibles.");
    return [];
  }
  else{
    return querySnapshot.docs.map((obras) => {
      return {
        id: obras.id,
        nombre: obras.data().Nombre || null,
        PDT: obras.data().NCarpeta || null,
        fechaFirmaContrato: obras.data().Fechafirmacontrato || null,
        Comitente: obras.data().Comitente || null,
        Estado: obras.data().Estado || null,
        Ubicacion: obras.data().Ubicacion || null,
      };
    });
  }  
}
}
