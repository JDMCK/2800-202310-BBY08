
import { auth, firestore } from '../config/firebase.js';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

function LogIn() {

    const navigate = useNavigate();
    const [logInEmail, setLogInEmail] = useState('');
    const [logInPassword, setLogInPassword] = useState('');

    
    const SignIn = async () => {
        const usersCollectionRef = collection(firestore, 'users');
        try{
            const res = await signInWithEmailAndPassword(auth, logInEmail, logInPassword);
            navigate('/')
        } catch (e) {
            console.error("error adding document ", e)
        }
    };




    return (
        <>
            <Navbar title='BarterBetter' backArrow={true} />
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
                    <button onClick={SignIn}>Log In</button>
                </form>
            </div>
        </>

    )
}



export default LogIn;