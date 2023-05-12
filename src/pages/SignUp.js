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

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const uid = auth.currentUser.uid;

            await setDoc(doc(firestore, 'users', uid),
                {
                    first_name: registerFirstName,
                    last_name: registerLastName,
                    email: registerEmail,
                    profile_picture_URL: 'https://firebasestorage.googleapis.com/v0/b/barter-better.appspot.com/o/profile_pictures%2Fplaceholder_profile_picture.png?alt=media&token=c9f16525-6290-4e00-830c-dc5dfcfc11a1'
                });
            navigate('/');
        } catch (e) {
            console.error('Failed to signup.', e)
        }
    };

    return (
        <>
            <Navbar title='Barter Better' />
            <div className='user-form'>
                <h1>Sign Up</h1>
                <form onSubmit={event => event.preventDefault()}>
                    <input type='email' placeholder='email'
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }}>
                    </input>
                    <input type='password' placeholder='password'
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }}>
                    </input>
                    <input type='text' placeholder='first name'
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}>
                    </input>
                    <input type='text' placeholder='last name'
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}>
                    </input>
                    <button onClick={register}>Sign Up</button>
                    <p>Already have an account? </p>
                    <Link to={'/login'}>Login</Link>
                </form>
            </div>
        </>

    )
}



export default SignUp;