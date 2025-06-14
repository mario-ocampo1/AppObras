import AsyncStorage from '@react-native-async-storage/async-storage';

interface CyclePayload<T> {
  count: number;
  data: T | null;
}

/**
 * Avanza el contador de ciclos para la clave indicada.
 * Retorna true si al avanzar el contador alcanza maxCycles (debe refrescar).
 * Mantiene los datos en AsyncStorage junto con el conteo.
 */
export async function advanceCycle(
  key: string,
  maxCycles: number
): Promise<boolean> {
  // 1) Leer payload existente o inicializar
  const raw = await AsyncStorage.getItem(key);
  const payload: CyclePayload<unknown> = raw
    ? JSON.parse(raw)
    : { count: 0, data: null };

  // 2) Incrementar contador
  payload.count += 1;

  // 3) Chequear si alcanzó el límite
  const shouldRefresh = payload.count >= maxCycles;
  if (shouldRefresh) {
    // resetear contador
    payload.count = 0;
  }

  // 4) Guardar payload actualizado
  await AsyncStorage.setItem(key, JSON.stringify(payload));

  return shouldRefresh;
}