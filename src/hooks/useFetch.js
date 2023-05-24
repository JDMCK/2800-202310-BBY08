import { useEffect, useState } from 'react';

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    return async () => {
      try {
        const response = await fetch(url);
        setData(await response.json());
        setIsPending(false);
      } catch (error) {
        setError(error);
      }
    }
  }, [url])

  return { data, isPending, error };
}

export default useFetch;