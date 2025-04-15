// src/Login.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login() {
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, "usuario@example.com", "password123");
      const token = await userCredential.user.getIdToken();
      console.log("Token:", token); // Este token lo enviás al backend
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return <button onClick={handleLogin}>Iniciar sesión</button>;
}

export default Login;
