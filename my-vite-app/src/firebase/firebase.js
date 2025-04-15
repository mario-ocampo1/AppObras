// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCcoXrjeL16Rf6MxMcIyAy7-VJEod2eaKI",

    authDomain: "asistente-en-obras.firebaseapp.com",

    projectId: "asistente-en-obras",

    storageBucket: "asistente-en-obras.firebasestorage.app",

    messagingSenderId: "931520882879",

    appId: "1:931520882879:web:f269cd5d648eafb315be0a"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);