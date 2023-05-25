import { auth } from '../config/firebase.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';
import { Confirmation, Navbar } from '../components';


function ResetPassword() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const SendPasswordEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    document.getElementById('confirm-modal').showModal();
  }

  const backToLogin = () => {
    navigate('/login');
  }

  return (
    <>
      <Navbar title='BarterBetter' backArrow={true} />
      <div className='user-form'>
        <h1>
          Request Password Reset
        </h1>
        <form onSubmit={event => event.preventDefault()}>
          <input type='email' placeholder='email'
            onChange={(event) => {
              setEmail(event.target.value);
            }}>
          </input>
          <button onClick={SendPasswordEmail}>Send</button>
        </form>
      </div>
      <Confirmation onConfirm={backToLogin} id='confirm-modal' buttonMessage='Back to Login' title='An email has been sent! Please follow the instructions on the email to reset your password.'></Confirmation>
    </>
  )

}

export default ResetPassword;