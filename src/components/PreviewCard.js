import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, storage } from '../config/firebase';
import Confirmation from './Confirmation';

const PreviewCard = ({ itemName, itemDesc, imgSrc, file }) => {

  const [disabledButton, setDisabledButton] = useState(false);

  const navigate = useNavigate();

  const userRef = doc(firestore, 'users', auth.currentUser.uid);


  const uploadItem = async () => {
    setDisabledButton(true);
    try {
      const itemsColRef = collection(firestore, 'items');
      const docRef = await addDoc(itemsColRef, {
        item_name: itemName,
        description: itemDesc,
        timeStamp: new Date(),
        user_ref: userRef
      });
      const storageRef = ref(storage, `item_pictures/${docRef.id}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await updateDoc(docRef, {
        picture_URL: downloadURL
      });

      document.getElementById('confirm-modal').showModal();

    } catch (error) {
      console.log('Error adding document: ', error);
    }

    localStorage.removeItem('name');
    localStorage.removeItem('description');
  }

  const goHome = () => {
    navigate('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(imgSrc);
        await response.blob();
      } catch (error) {
        console.log(error);
        navigate('/');
        window.location.reload();
      }
    }

    fetchData();
  });

  return (
    <>
      <div className='preview-card'>
        <div className='marketplace-card'>
          <img src={imgSrc} alt='Preview' />
          <div className='card-text'>
            <h3>{itemName}</h3>
            <p>{itemDesc}</p>
          </div>
        </div>
      </div>
      <button id='add-item-btn' disabled={disabledButton} className='add-item' type='button' onClick={uploadItem}>Add Item</button>
      <Confirmation onConfirm={goHome} />
    </>
  );
};

export default PreviewCard;
