import { auth, firestore } from '../config/firebase.js';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignUp() {
    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerFirstName, setFirstName] = useState("");
    const [registerLastName, setLastName] = useState("");
    const [range, setRange] = useState('50km');

    const [error, setError] = useState('');

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const uid = auth.currentUser.uid;

            await setDoc(doc(firestore, 'users', uid),
                {
                    first_name: registerFirstName,
                    last_name: registerLastName,
                    email: registerEmail,
                    preferred_range: range,
                    profile_picture_URL: 'https://firebasestorage.googleapis.com/v0/b/barter-better.appspot.com/o/profile_pictures%2Fplaceholder_profile_picture.png?alt=media&token=c9f16525-6290-4e00-830c-dc5dfcfc11a1'
                });
            navigate('/');
        } catch (e) {
            if (e.code === 'auth/weak-password') {
                setError('Password must be at least 6 characters long.');
            } else if (e.code === 'auth/email-already-in-use') {
                setError('Email already in use.');
            } else {
                setError('Failed to signup.');
                console.error('Failed to signup.', e)
            }
        }
    };


    return (
        <>
            <Navbar title='BarterBetter' />
            <div className='user-form'>
                <h1>Signup</h1>
                <form onSubmit={event => event.preventDefault()}>
                    <input required type='email' placeholder='email'
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }}>
                    </input>
                    <input required type='password' placeholder='password' min='6'
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }}>
                    </input>
                    <input required type='text' placeholder='first name'
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}>
                    </input>
                    <input required type='text' placeholder='last name'
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}>
                    </input>
                    <datalist id='range-values'>
                        <option value='5' label='5km'></option>
                        <option value='10' label='10km'></option>
                        <option value='15' label='15km'></option>
                        <option value='25' label='25km'></option>
                        <option value='50' label='50km+'></option>
                    </datalist>
                    <label htmlFor='range-input'>Trading Distance: <span>{range}</span></label>
                    <input id='range-input' type='range' min='5' max='50'
                        list='range-values' onChange={event => {
                            setRange(event.target.value + 'km');
                        }}>
                    </input>
                    <p className='login-error'><b>{error}</b></p>
                    <button onClick={register}>Sign Up</button>
                    <p>Already have an account? </p>
                    <Link to={'/login'}>Login</Link>
                </form>
            </div>
        </>

    )
}



export default SignUp;