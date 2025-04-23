import { View, Text, Button, Alert, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import CustomInput from '../../components/loginform'; // Ajustá el path si hace falta
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';


 

export default function Login() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    Alert.alert('Login', 'Iniciando sesión...');
    if (!nombre || !password) {
      Alert.alert('Error', 'Por favor ingresa tu nombre de usuario y contraseña');
      return;
    }
    try {
      // Aquí se hace la autenticación con Firebase
      const userCredential = await signInWithEmailAndPassword(auth,nombre, password);

      // Si la autenticación fue exitosa, redirige al usuario
      router.replace('/tabs/home'); // Redirigir a la página principal

    } catch (error) {
      if (error instanceof FirebaseError) {
        // Manejo de errores específico de Firebase
        console.error('Firebase error:', error.code, error.message);
        Alert.alert('Error', 'Error de Firebase: ' + error.message);
      } else {
      // En caso de error, muestra un mensaje
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos');
      }
    }
  } 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image
  source={require('../../assets/images/Logo.png')} // ajustá la ruta según dónde esté tu archivo
  style={{ width: 250, height: 250, marginBottom: 20 }}
  resizeMode="contain"
/>
      <Text style={{ fontSize:30, textAlign: 'center', marginBottom: 20 }}>Bienvenido a la aplicación asistente de obras</Text>
      <Text  style={{ fontSize: 24, marginBottom: 10, textAlign: 'center' }}>Inicio de sesión</Text>
      
      <CustomInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese su nombre de usuario"
        keyboardType="default"
        
      />
        
        <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese su contraseña"
        keyboardType="default"
        secureTextEntry={true}
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}