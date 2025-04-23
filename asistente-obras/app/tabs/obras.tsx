import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useObras } from "../../hooks/useObras"; // Ajustá el path si hace falta
import {Surface,
  Provider as PaperProvider,
  Card,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";
import { useState } from "react";

export default function ObrasPage() {
  const { obras, loading, error } = useObras(); // Llamamos al hook `useObras`
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string | null>(null);
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
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 16 }}>
        <Button
          mode={estadoSeleccionado === null ? "contained" : "outlined"}
          onPress={() => setEstadoSeleccionado(null)}
        >
          Todas
        </Button>
        <Button
          mode={estadoSeleccionado === "Obras" ? "contained" : "outlined"}
          onPress={() => setEstadoSeleccionado("Obras")}
        >
          En obra
        </Button>
        <Button
          mode={estadoSeleccionado === "Finalizada" ? "contained" : "outlined"}
          onPress={() => setEstadoSeleccionado("Finalizada")}
        >
          Finalizadas
        </Button>
      </View>

      <FlatList
        data={obrasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 16 }} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium">{item.nombre}</Text>
              <Text variant="bodyMedium">Obra N°: {item.id}</Text>
              <Text variant="bodyMedium">Expediente: {item.PDT}</Text>
              <Text variant="bodySmall">Fecha firma de contrato: {item.fechaFirmaContrato}</Text>
            </Card.Content>
            <Card.Actions style={{ flexWrap: "wrap", justifyContent: "flex-start" }}>
              <Button mode="contained" style={{ margin: 4, minWidth: 150 }}>
                Ver Historial de tareas
              </Button>
              <Button mode="contained" style={{ margin: 4, minWidth: 150 }}>
                Cargar gasto de obra
              </Button>
              <Button mode="contained" style={{ margin: 4, minWidth: 150 }}>
                Informar acontecimiento
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </Surface>
  );
}
