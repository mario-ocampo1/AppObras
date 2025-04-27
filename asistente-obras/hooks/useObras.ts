import { useEffect, useState } from 'react';
import {
  getData,
  saveData,
  removeData,
  keyObras
} from '@/scripts/storage/asyncStorage';
import { obtenerObras, Obras } from '../services/obrasService';

/**
 * Hook para obtener obras usando AsyncStorage con ciclo de refresco cada 5 lecturas.
 */
export function useObras(id?: string) {
  const [obras, setObras] = useState<Obras[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const storageKey = keyObras(id);

    const loadObras = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getData<Obras[]>(
          storageKey,
          5,
          () => obtenerObras(id)
        );
        if (isMounted) setObras(data);
      } catch (err) {
        console.error('Error en useObras:', err);
        if (isMounted) setError('Error al cargar las obras');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadObras();
    return () => { isMounted = false; };
  }, [id]);

  return { obras, loading, error };
}
