import { View, Text } from 'react-native';
import  TableInformation from ".././../components/TableInformation";

export default function Home() {
  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20, textDecorationLine:'underline' }}>Página Principal</Text>
      <Text style={{ fontSize: 16, marginTop: 20, marginStart:20 }}>Ultimas novedades</Text>
      <TableInformation expediente={1235} novedad={"Soy la novedad"} />
     
      
    </View>
    
  );
  
}
