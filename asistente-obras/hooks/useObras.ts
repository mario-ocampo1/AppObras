import { useEffect, useState } from 'react';
import { obtenerObras, Obras } from '../services/obrasService';

export function useObras(id?: string){
    const [obras, setObras] = useState<Obras | Obras[] | null>(null);  // Estado para las obras
    const [loading, setLoading] = useState<boolean>(true);  // Estado de carga
    const [error, setError] = useState<string | null>(null);  // Estado de error

    useEffect(() => {
        const fetchObras = async () => {
          setLoading(true);  // Iniciamos la carga
          setError(null);     // Limpiamos cualquier error anterior
    
          try {
            const data = await obtenerObras(id);  // Llamamos al servicio para obtener las obras
            setObras(data);  // Guardamos los datos en el estado
            
          } catch (error) {
            console.log('====================================');
            console.log(error);  // Mostramos el error en la consola
            console.log('====================================');
            setError('Error al obtener las obras');  // Si ocurre un error, lo guardamos en el estado
          } finally {
            setLoading(false);  // Terminamos el estado de carga
          }
        };
    
        fetchObras();  // Ejecutamos la función al montar el componente
      }, [id ?? null]);  // Este hook se ejecuta cada vez que cambia el `id`
      return { obras, loading, error };  // Retornamos el estado
    }
