import { Navbar, Footer, InventoryItem } from "../components";
import { useNavigate } from "react-router-dom";
import { useCollectionDataOnce, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { collection, doc, query, where } from 'firebase/firestore';
import { firestore } from "../config/firebase";

import { gear } from '../img';
import downloadURL from '../img/example_profile_picture.jpg';

const Profile = () => {

  const navigate = useNavigate();
  const auth = 'xGCJSk5AROFg21ZETFlO'; //useContext(AuthProvider);

  // Get user and item data from firestore
  const userDocRef = doc(firestore, `users/${auth}`); //.currentUser.uid}`)
  const [userDoc] = useDocumentDataOnce(userDocRef);
  const [items] = useCollectionDataOnce(
    query(collection(firestore, 'items'), where('user_ref', '==', userDocRef))
  );
  // const [downloadURLs, setDownloadURLs] = useState([]);

  // useEffect(() => {
  //   const getDownloadURLs = async () => {
  //     if (items) {
  //       const itemPictureURLs = items.map(item => item.picture_URL);
  //       const storageRefs = itemPictureURLs.map(url => ref(storage, url));
  //       const downloadURLs = storageRefs.map(async storageRef => await getDownloadURL(storageRef));
  //       setDownloadURLs(await Promise.all(downloadURLs));
  //     }
  //   }
  //   getDownloadURLs();

  // }, [items]);

  // Button handlers
  const handleItemClick = item => navigate(`/item/${item.id}`, { state: JSON.stringify(item) });
  const handleSettings = () => navigate('/settings', { state: JSON.stringify(userDoc) });
  const description = '⭐⭐⭐⭐⭐';
  // const { downloadURL } = useReadStorage('/profile_pictures/example_profile_picture.png');


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
          <img src={downloadURL} alt='profile' />
        </div>
        <h1>{userDoc && userDoc.first_name + ' ' + userDoc.last_name}</h1>
        <p>{description}</p>
      </section>
      <section className='profile-inventory'>
        {items && items.map((item, i) =>
          <InventoryItem key={i} onClick={() => handleItemClick(item)} thumbnail={item.picture_URL} />)}
      </section>
      <Footer />
    </>
  );
}

export default Profile;