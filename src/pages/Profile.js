import { Navbar, Footer, InventoryItem } from '../components';
import { useNavigate } from 'react-router-dom';
import { useCollectionData, useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc, query, where, orderBy } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase';
import { placeholderImage } from '../img';
import { edit } from '../img';

const Profile = () => {

  const navigate = useNavigate();

  // Get user and item data from firestore
  const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);
  const [userDoc] = useDocumentData(userDocRef);
  const [itemRefs] = useCollection(
    query(collection(firestore, 'items'), where('user_ref', '==', userDocRef), where('isTraded', '==', false), orderBy('timeStamp', 'desc'),)
  );
  const [items] = useCollectionData(
    query(collection(firestore, 'items'), where('user_ref', '==', userDocRef), where('isTraded', '==', false), orderBy('timeStamp', 'desc'))
  );

  // Button handlers
  const handleItemClick = (item, itemId) =>
    navigate('/item', { state: { item: JSON.stringify(item), itemId: itemId } });
  const handleSettings = () => navigate('/settings', { state: JSON.stringify(userDoc) });

  return (
    <>
      <Navbar title='Profile' navButtons={[
        {
          onclick: handleSettings,
          icon: edit
        }
      ]} />
      <div className='profile-container'>
        <div className='profile-card'>
          <section className='profile'>
            <div className='profile-picture'>
              <img src={userDoc && userDoc.profile_picture_URL} alt='' />
            </div>
            <h1>{userDoc && userDoc.first_name + ' ' + userDoc.last_name}</h1>
          </section>
          <section className='profile-inventory'>
            {items && items.map((item, i) =>
              <InventoryItem key={i} onClick={() => handleItemClick(item, itemRefs.docs[i].id)}
                thumbnail={item.picture_URL ? item.picture_URL : placeholderImage} />)}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
