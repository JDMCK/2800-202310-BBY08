import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { auth } from '../config/firebase';

const Settings = () => {

  const location = useLocation();
  const userDoc = JSON.parse(location.state);
  const navigate = useNavigate();

  // const auth = useContext(AuthProvider);


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
        <p>{userDoc && userDoc.preferred_range}</p>
      </div>
      <div className='settings-item' onClick={handleResetPassword}>
        <h3>Reset Password</h3>
      </div>
      <div className='settings-item' onClick={handleLogout}>
        <h3>Logout</h3>
      </div>
      </div>
    </>
  );
}

export default Settings;