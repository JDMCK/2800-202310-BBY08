import { useEffect, useState } from "react";
import { storage } from '../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const useReadStorage = (url) => {

  const [downloadURL, setDownloadURL] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    return async () => {
      try {
        const storageRef = ref(storage, url);
        setDownloadURL(await getDownloadURL(storageRef));
        setIsPending(false);
      } catch (error) {
        setError(error);
      }
    }
  }, [url])

  return { downloadURL, isPending, error };
}

export default useReadStorage;