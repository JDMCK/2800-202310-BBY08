import { useLocation, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';

import { placeholderImage } from '../img';
import { auth, firestore, storage } from '../config/firebase';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { deleteObject, ref } from 'firebase/storage';

const Item = () => {

  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [picURL, setPicURL] = useState('');

  const location = useLocation();
  const itemDoc = JSON.parse(location.state.item);
  const itemId = location.state.itemId || '';

  const showDelete = () => {
    return auth.currentUser.uid === itemDoc.user_ref._key.path.segments.at(-1) && itemId;
  }

  const handleDelete = async () => {
    setDisabledButton(true);
    await deleteDoc(doc(firestore, 'items', itemId));
    await deleteObject(ref(storage, itemDoc.picture_URL));
    navigate(-1);
  }

  useEffect(() => {
    const fetchData = async () => {
      let poster = null;
      if (
        itemDoc &&
        itemDoc.user_ref &&
        itemDoc.user_ref._key &&
        itemDoc.user_ref._key.path &&
        itemDoc.user_ref._key.path.segments
      ) {
        poster = itemDoc.user_ref._key.path.segments.at(-1);
      }
      try {
        const userRef = await getDoc(doc(firestore, 'users', poster));
        if (userRef.exists()) {
          const userData = userRef.data();
          if (userData && userData.email) {
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setPicURL(userData.profile_picture_URL);
          } else {
            console.log("User document does not have an email field");
          }
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.log("Error retrieving user document:", error);
      }
    };

    fetchData();
  }, [itemDoc]);

  
  const getTimeSincePosted = (timestamp) => {
    const currentTime = new Date();
    const adjustedDate = new Date((60 + timestamp) * 1000); // Convert Firestore timestamp to JavaScript Date object
    const timeDifference = currentTime - adjustedDate;
  
    // Calculate time differences in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;
  
    if (timeDifference < minute) {
      return 'Just now';
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeDifference < month) {
      const days = Math.floor(timeDifference / day);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(timeDifference / year);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  return (
    <>
      <Navbar title='Item' backArrow={true} />
      <div className='item-container-page'>
      <div className='item'>
        <div className='item-img'>
          <img src={itemDoc.picture_URL} alt={placeholderImage} />
        </div>
        <h1>{itemDoc.item_name}</h1>
        <p>{itemDoc.description}</p>
        <div className='bottom-row'>
        <p id='posting'>Posted by:</p>
        <p id='prof'><img src={picURL} alt='profile' />
        {firstName} {lastName}</p>
        {itemDoc.timeStamp && <p className='timestamp'>{getTimeSincePosted(itemDoc.timeStamp.seconds)}</p>}
      </div>
        {showDelete() && <button disabled={disabledButton} onClick={handleDelete}>Delete</button>}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Item;