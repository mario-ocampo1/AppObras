import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useObras } from "../../hooks/useObras"; // Ajustá el path si hace falta
import {
  Surface,
  Provider as PaperProvider,
  Card,
  Title,
  Paragraph,
  Button,
  IconButton,
  Tooltip, SegmentedButtons
} from "react-native-paper";
import { useState } from "react";

export default function ObrasPage() {
  const { obras, loading, error } = useObras(); // Llamamos al hook `useObras`
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string | null>(
    null
  );
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Muestra un indicador de carga mientras obtenemos los datos
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Muestra un mensaje de error si algo sale mal
  }

  if (!obras || obras.length === 0) {
    return <Text>No hay obras disponibles.</Text>; // Muestra un mensaje si no hay obras
  }
  let obrasFiltradas: any[] = [];

  if (Array.isArray(obras)) {
    obrasFiltradas = estadoSeleccionado
      ? obras.filter((obra) => obra.Estado === estadoSeleccionado)
      : obras;
  } else {
    // Solo hay una obra
    obrasFiltradas = [obras]; // la metemos en un array para poder usar FlatList
  }

  return (
    <Surface style={{ flex: 1, padding: 16 }}>
      <SegmentedButtons
  value={estadoSeleccionado ?? 'En obra'}
  onValueChange={(value) => {
    setEstadoSeleccionado(value === 'todas' ? null : value);
  }}
  buttons={[
    {
      value: 'todas',
      label: 'Todas',
    },
    {
      value: 'Obras',
      label: 'En obra',
    },
    {
      value: '2da parte',
      label: 'Por comenzar',
    },
    {
      value: 'Finalizada',
      label: 'Finalizadas',
    },
  ]}
/>

      <FlatList
        data={obrasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 16 }} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium">{item.nombre}</Text>
              <Text variant="bodyMedium">Obra N°: {item.id}</Text>
              <Text variant="bodyMedium">Expediente: {item.PDT}</Text>
              <Text variant="bodySmall">
                Fecha firma de contrato: {item.fechaFirmaContrato}
              </Text>
            </Card.Content>
            <Card.Actions
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {/* <Button mode="contained" style={{ marginHorizontal: 4, flex: 1,minWidth:10 }} labelStyle={{ fontSize: 12 }} >
                Ver Historial
              </Button>
              <Button mode="contained" style={{ marginHorizontal: 4, flex: 1,minWidth:10 }} labelStyle={{ fontSize: 12 }} >
                Nuevo gasto
              </Button>
              <Button mode="contained" style={{ marginHorizontal: 4, flex: 1,minWidth:10 }} labelStyle={{ fontSize: 12 }} >
                Informar 
              </Button> */}

              <IconButton
                icon="ballot"
                size={24}
                onPress={() => console.log("Ver historial")}
                accessibilityLabel="Ver historial"
              />
              <IconButton
                icon="currency-usd"
                size={24}
                onPress={() => console.log("Cargar gasto")}
                accessibilityLabel="Cargar gasto"
                iconColor="green"
              />
              <IconButton
                icon="alert"
                size={24}
                onPress={() => console.log("Informar acontecimiento")}
                accessibilityLabel="Informar"
                iconColor="red"
              />
            </Card.Actions>
          </Card>
        )}
      />
    </Surface>
  );
}
