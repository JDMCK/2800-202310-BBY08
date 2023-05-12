import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, storage } from '../config/firebase';

const PreviewCard = (props) => {

  const navigate = useNavigate();

  const userRef = doc(firestore, 'users', auth.currentUser.uid);

  const uploadItem = async () => {
    try {
      const itemsColRef = collection(firestore, 'items');
      const docRef = await addDoc(itemsColRef, {
        item_name: props.itemName,
        description: props.itemDesc,
        user_ref: userRef
      });
      const storageRef = ref(storage, `item_pictures/${docRef.id}`);
      const snapshot = await uploadBytes(storageRef, props.file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await updateDoc(docRef, {
        picture_URL: downloadURL
      });

    } catch (error) {
      console.log('Error adding document: ', error);
    }

    localStorage.removeItem('name');
    localStorage.removeItem('description');
    localStorage.removeItem('image');
    localStorage.removeItem('file');

    navigate('/');
  }

  return (
    <>
      <div className="preview-card">
        <h1>{props.itemName}</h1>
        <p>{props.itemDesc}</p>
        <img src={props.imgSrc} alt="Preview" />
        <button className='add-item' type='button' onClick={uploadItem}>Add Item</button>
      </div>
    </>
  );
};

export default PreviewCard;
