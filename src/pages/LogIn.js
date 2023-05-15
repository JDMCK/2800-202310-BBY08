import { auth } from '../config/firebase.js';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from '../components';

function LogIn() {

    const navigate = useNavigate();
    const [logInEmail, setLogInEmail] = useState('');
    const [logInPassword, setLogInPassword] = useState('');
    const [error, setError] = useState('');


    const SignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, logInEmail, logInPassword);
            navigate('/');
        } catch (e) {
            setError('Failed to login.');
            console.error("Failed to login.", e)
        }
    };

    return (
        <>
            <Navbar title='BarterBetter' />
            <div className='user-form'>
                <h1>Log In</h1>
                <form onSubmit={event => event.preventDefault()}>
                    <input type='email' placeholder='email'
                        onChange={(event) => {
                            setLogInEmail(event.target.value);
                        }}>
                    </input>
                    <input type='password' placeholder='password'
                        onChange={(event) => {
                            setLogInPassword(event.target.value);
                        }}>
                    </input>
                    <br></br>
                    <p className='login-error'><b>{error}</b></p>
                    <button onClick={SignIn}>Log In</button>
                </form>
                <Link to='/resetPassword'>
                    Forgot Password?
                </Link>
                <div className='link-signup'>
                    <p>Don't have an account?</p>
                    <Link to='/signup'>Signup</Link>
                </div>
            </div>
        </>

    )
}



export default LogIn;