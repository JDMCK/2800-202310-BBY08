import { useNavigate } from "react-router";
import { firestore } from "../config/firebase";
import { getDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const MarketplaceCard = ({ itemDoc }) => {

  const item = itemDoc.data();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [picURL, setPicURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (item.user_ref) {
        try {
          const userRef = doc(firestore, 'users', item.user_ref._key.path.segments.at(-1));
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
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
      }
    };

    fetchData();
  }, [item]);



  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate('/item', { state: { item: JSON.stringify(item), itemId: itemDoc.id } });
  };

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


    <div className='marketplace-card' onClick={handleItemClick}>
      <img src={item.picture_URL} alt='item' />
      <div className='card-text'>
        <h3>{item.item_name}</h3>
        <p>{item.description}</p>
        <b>{item.location}</b>
      </div>
      <div className='bottom-row'>
        <p id='posting'>Posted by:</p>
        <p id='prof'><img src={picURL} alt='profile' />
          {firstName} {lastName}</p>
        {item.timeStamp && <p className='timestamp'>{getTimeSincePosted(item.timeStamp.seconds)}</p>}
      </div>
    </div>
  );
}

export default MarketplaceCard;