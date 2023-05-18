import { useLocation, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';

import { placeholderImage } from '../img';
import { auth, firestore, storage } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';

const Item = () => {
  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const itemDoc = JSON.parse(location.state.item);
  const itemRef = location.state.itemRef || '';

  const showDelete = () => {
    return auth.currentUser.uid === itemDoc.user_ref._key.path.segments.at(-1) && itemRef;
  }

  const handleDelete = async () => {
    setDisabledButton(true);
    await deleteDoc(doc(firestore, 'items', itemRef));
    await deleteObject(ref(storage, itemDoc.picture_URL));
    navigate(-1);
  }

  return (
    <>
      <Navbar title='Item' backArrow={true} />
      <div className='item'>
        <div className='item-img'>
          <img src={itemDoc.picture_URL} alt={placeholderImage} />
        </div>
        <h1>{itemDoc.item_name}</h1>
        <p>{itemDoc.description}</p>
        {showDelete() && <button disabled={disabledButton} onClick={handleDelete}>Delete</button>}
      </div>
      <Footer />
    </>
  );
}

export default Item;