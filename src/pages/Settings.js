import { Navbar } from "../components";

const Settings = () => {

  const handleLogoff = () => {
    console.log('logoff!');
  }

  const handleResetPassword = () => {
    console.log('reset password!');
  }

  return (
    <>
      <Navbar title='Settings' backArrow={true} />
      <div className='settings-item' onClick={handleResetPassword}>
        <h3>Reset Password</h3>
      </div>
      <div className='settings-item' onClick={handleLogoff}>
        <h3>Logoff</h3>
      </div>
    </>
  );
}

export default Settings;