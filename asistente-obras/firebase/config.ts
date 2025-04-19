// firebase/config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {

    apiKey: "AIzaSyCcoXrjeL16Rf6MxMcIyAy7-VJEod2eaKI",
  
    authDomain: "asistente-en-obras.firebaseapp.com",
  
    projectId: "asistente-en-obras",
  
    storageBucket: "asistente-en-obras.appspot.com",
  
    messagingSenderId: "931520882879",
  
    appId: "1:931520882879:web:f269cd5d648eafb315be0a"
  
  };
  
// Verifica si ya existe una instancia de Firebase inicializada
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };