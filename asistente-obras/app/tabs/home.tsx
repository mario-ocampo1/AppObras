import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>Bienvenido a la aplicación asistente de obras</Text>
      <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Esta es la página principal.</Text>
      <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Aquí puedes ver las obras y gestionar tus tareas.</Text>
    </View>
  );
}
