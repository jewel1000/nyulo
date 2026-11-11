import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Generic data-fetching hook.
 *
 * @param {Function} fetcher async function returning { data, meta }
 * @param {Array} deps re-fetches whenever these change
 */
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcherRef.current();
      setData(response.data);
      setMeta(response.meta || null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, meta, loading, error, refetch: load };
}
