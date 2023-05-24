import { auth } from '../config/firebase.js';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Navbar } from '../components';


function ResetPassword() {

    const [email, setEmail] = useState('');

    const SendPasswordEmail = async () => {
        await sendPasswordResetEmail(auth, email);
        alert('Email Has Been Sent')
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
        </>
    )

}

export default ResetPassword;