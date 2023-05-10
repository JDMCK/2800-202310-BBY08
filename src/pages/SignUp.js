
import { auth, firestore } from '../config/firebase.js';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignUp() {

    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerName, setRegisterName] = useState("");

    const register = async () => {
        const usersCollectionRef = collection(firestore, 'users');
        try{
            const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const newUser = await addDoc(usersCollectionRef, { first_name: registerName, email: registerEmail});
            navigate('/')
        } catch (e) {
            console.error("error adding document ", e)
        }
    };



    return (
        <>
            <Navbar title='Sign Up' backArrow={true} />
            <div className='user-form'>
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
                            setRegisterName(event.target.value);
                        }}>
                    </input>
                    <button onClick={register}>Sign Up</button>
                </form>
            </div>
        </>

    )
}



export default SignUp;