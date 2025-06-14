 import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { obtenerObras, type Obras } from '@/services/obrasService';

interface TableInformationProps {
  expediente: string | number;
  novedad: string;
}
// Si estás usando TypeScript, crear una interface o un type para las props es la forma recomendada de escribir componentes React. 

const TableInformation = ({expediente, novedad}: TableInformationProps) => {
    const isUndefined = expediente === undefined || novedad === undefined
const initialTitle =  isUndefined ? `Expediente n°:undefined` : `Expediente n°:${expediente}`;
  const initialBody = isUndefined ? 'Ultima novedad cargada: undefined' : 'Ultima novedad cargada: ' + novedad;
    const [titleText, setTitleText] = useState(initialTitle);
  const [bodyText, setBodyText] = useState(initialBody);

  const onPressTitle = () => {
    setTitleText("Expediente n°:1 [Presionado]");
  };
  const [obras, setObras] = useState <Obras | Obras[] | null >(null);
useEffect(() =>{
  async function fetchObras () {
    const data = await obtenerObras();
    setObras(data);
  
  }
  fetchObras();
 
}, [])
   console.log('====================================');
      console.log('obras:', obras);
      console.log('====================================');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={onPressTitle}>
            {titleText}
            {'\n'}
            {'\n'}
          </Text>
          <Text numberOfLines={5}>{bodyText}</Text>
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TableInformation;