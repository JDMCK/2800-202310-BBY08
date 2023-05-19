import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { auth, firestore, storage } from '../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

const Settings = () => {

  const location = useLocation();
  const userDoc = JSON.parse(location.state);
  const navigate = useNavigate();

  const [range, setRange] = useState(userDoc.preferred_range);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }

  const handleResetPassword = () => {
    navigate('/resetPassword');
  }

  const handleProfilePicture = async () => {

    const fileInput = document.getElementById('change-profile-picture-input');

    if (fileInput.files.length > 0) {
      const photo = fileInput.files[0];

      const oldPicture = userDoc.profile_picture_URL; // Gets old picture for deletion

      if (oldPicture !== 'https://firebasestorage.googleapis.com/v0/b/barter-better.appspot.com/o/profile_pictures%2Fplaceholder_profile_picture.png?alt=media&token=c9f16525-6290-4e00-830c-dc5dfcfc11a1') {

        await deleteObject(ref(storage, oldPicture)); // Deletes the old profile pic
      }
      const userDocRef = doc(firestore, 'users', auth.currentUser.uid); // Gets current user doc ref

      const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`); // Gets ref to storage file
      const newPicture = await uploadBytes(storageRef, photo); // Uploads a new picture to the storage

      const downloadURL = await getDownloadURL(newPicture.ref); // Gets downloadURL for the new picture
      await setDoc(userDocRef, { profile_picture_URL: downloadURL }, { merge: true }); // Updates the user doc with new pic URL
    }
  }

  const handleTradingDistance = async () => {

    if (range !== userDoc.preferred_range) {

      const userDocRef = doc(firestore, 'users', auth.currentUser.uid); // Gets current user doc ref
      await setDoc(userDocRef, { preferred_range: range }, { merge: true });
    }
  }

  const handleSave = async () => {
    document.getElementById('settings-save').disabled = true;
    await handleProfilePicture();
    await handleTradingDistance();
    navigate(-1);
  }


  return (
    <>
      <Navbar title='Settings' backArrow={true} />
      <div className='settings-container'>
        <div className='settings-item'>
          <h3>Email:</h3>
          <p>{userDoc && userDoc.email}</p>
        </div>
        <div className='settings-item'>
          <h3>Trading Distance:</h3>
          <p>{range && range + 'km'}</p>
          <datalist id='range-values'>
            <option value='5' label='5km'></option>
            <option value='10' label='10km'></option>
            <option value='15' label='15km'></option>
            <option value='25' label='25km'></option>
            <option value='50' label='50km+'></option>
          </datalist>
          <input className='settings-input' id='range-input' type='range' min='5' max='50'
            list='range-values' value={range} onChange={event => {
              setRange(event.target.value);
            }}>
          </input>
        </div>
        <div className='settings-item'>
          <h3>Change Profile Picture</h3>
          <input className='settings-input' id='change-profile-picture-input' type='file' accept='image/*' />
        </div>
        <div className='settings-item' onClick={handleResetPassword}>
          <h3>Reset Password</h3>
        </div>
        <div className='settings-item' onClick={handleLogout}>
          <h3>Logout</h3>
        </div>
        <div className='settings-save-button'>
          <button id='settings-save' className='settings-input' onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default Settings;