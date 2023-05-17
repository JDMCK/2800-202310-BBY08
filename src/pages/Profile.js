import { Navbar, Footer, InventoryItem } from "../components";
import { useNavigate } from "react-router-dom";
import { useCollectionDataOnce, useCollectionOnce, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { collection, doc, query, where } from 'firebase/firestore';
import { auth, firestore } from "../config/firebase";
import { placeholderImage } from '../img';
import { gear } from '../img';

const Profile = () => {

  const navigate = useNavigate();

  // Get user and item data from firestore
  const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);
  const [userDoc] = useDocumentDataOnce(userDocRef);
  const [itemRefs] = useCollectionOnce(
    query(collection(firestore, 'items'), where('user_ref', '==', userDocRef))
  );
  const [items] = useCollectionDataOnce(
    query(collection(firestore, 'items'), where('user_ref', '==', userDocRef))
  );

  // Button handlers
  const handleItemClick = (item, itemId) =>
    navigate('/item', { state: { item: JSON.stringify(item), itemId: itemId } });
  const handleSettings = () => navigate('/settings', { state: JSON.stringify(userDoc) });
  const description = '⭐⭐⭐⭐⭐';

  return (
    <>
      <Navbar title='Profile' navButtons={[
        {
          onclick: handleSettings,
          icon: gear
        }
      ]} />
      <section className='profile'>
        <div className='profile-picture'>
          <img src={userDoc && userDoc.profile_picture_URL} alt='' />
        </div>
        <h1>{userDoc && userDoc.first_name + ' ' + userDoc.last_name}</h1>
        <p>{description}</p>
      </section>
      <section className='profile-inventory'>
        {items && items.map((item, i) =>
          <InventoryItem key={i} onClick={() => handleItemClick(item, itemRefs.docs[i].id)}
            thumbnail={item.picture_URL ? item.picture_URL : placeholderImage} />)}
      </section>
      <Footer />
    </>
  );
};

export default Profile;
