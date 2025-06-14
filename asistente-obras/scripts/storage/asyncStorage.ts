import AsyncStorage from '@react-native-async-storage/async-storage';
import { advanceCycle } from './cycleStorage';

interface CyclePayload<T> {
  count: number;
  data: T | null;
}

/**
 * Genera la clave de almacenamiento para la colección de obras.
 */
export function keyObras(id?: string): string {
  return `obras:${id ?? 'all'}`;
}

/**
 * Elimina la clave indicada de AsyncStorage.
 */
export async function removeData(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

/**
 * Guarda datos y resetea el ciclo.
 */
export async function saveData<T>(
  key: string,
  data: T
): Promise<void> {
  const payload: CyclePayload<T> = { count: 0, data };
  await AsyncStorage.setItem(key, JSON.stringify(payload));
}

/**
 * Obtiene datos desde AsyncStorage y maneja el ciclo de refresco.
 * Cada llamada a getData avanza el contador de ciclo.
 * Cuando advanceCycle retorna true, se invoca fetchFresh() y se actualiza cache.
 *
 * @param key - Clave bajo la cual se guarda el cache.
 * @param maxCycles - Número de lecturas antes de forzar refresh.
 * @param fetchFresh - Función async que retorna datos frescos.
 * @returns data almacenada o recién traída, o null si no existe.
 */
export async function getData<T>(
  key: string,
  maxCycles: number,
  fetchFresh: () => Promise<T>
): Promise<T | null> {
 // 1) Leer payload actual (para devolver data si no refresca)
 const raw = await AsyncStorage.getItem(key);
 const payload: CyclePayload<T> = raw
   ? JSON.parse(raw)
   : { count: 0, data: null };

 // 1.1) Si aún no hay datos, forzar primer fetch
 if (payload.data === null) {
   try {
     const freshData = await fetchFresh();
     await saveData(key, freshData); // resetear contador y guardar datos
     return freshData;
   } catch (err) {
     console.error(`Error al obtener datos iniciales [${key}]:`, err);
     return null;
   }
 }
  // 2) Avanzar ciclo y ver si toca refrescar
  const shouldRefresh = await advanceCycle(key, maxCycles);

  // 3) Si toca refrescar, llamar fetchFresh y guardar nuevo cache
  if (shouldRefresh) {
    try {
      const freshData = await fetchFresh();
      // guardar con count reseteado
      await saveData(key, freshData);
      return freshData;
    } catch (err) {
      console.error(`Error refrescando cache [${key}]:`, err);
      // en caso de error, devolvemos lo anterior (puede ser null)
    }
  }

  // 4) Si no refrescó, devuelve data previa (puede ser null)
  return payload.data;
}
