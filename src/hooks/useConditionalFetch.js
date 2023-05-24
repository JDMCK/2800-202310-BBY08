import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../config/firebase';

const useConditionalFetch = (path, type, firestorePath) => {

  const [value, setValue] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();


  useEffect(() => {

    const conditionalFirestore = async () => {

      let firestoreRef;
      if (type === 'doc') {
        firestoreRef = doc(firestore, firestorePath)
      } else if (type === 'col') {
        firestoreRef = collection(firestore, firestorePath);
      }

      let storageValue = sessionStorage.getItem(path);
      if (storageValue) {
        setValue(storageValue);
      } else {
        try {
          if (type === 'doc') {
            let firestoreValue = await getDoc(firestoreRef);
            setValue(JSON.stringify(firestoreValue));
            sessionStorage.setItem(path, JSON.stringify(firestoreValue));
          } else if (type === 'col') {
            let firestoreValue = await getDocs(firestoreRef);
            let docData = [];
            firestoreValue.forEach(doc => docData.push(doc.data()));
            setValue(JSON.stringify(docData));
            sessionStorage.setItem(path, JSON.stringify(docData));
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError(error);
        }
      }
    }
    conditionalFirestore();

  }, [path, type, firestorePath])

  return [value, loading, error];
}

export default useConditionalFetch;