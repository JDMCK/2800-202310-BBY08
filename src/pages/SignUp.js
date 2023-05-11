
import { auth, firestore } from '../config/firebase.js';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc, getFirestore } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignUp() {
    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerFirstName, setFirstName] = useState("");
    const [registerLastName, setLastName] = useState("");

    const register = async () => {
        const usersCollectionRef = collection(firestore, 'users');
        try{
            const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const uid = auth.currentUser.uid; 
                
            console.log(uid);
            await setDoc(doc(firestore, 'users', uid), 
            { 
                first_name: registerFirstName, 
                last_name: registerLastName, 
                email: registerEmail});
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
                            setFirstName(event.target.value);
                        }}>
                    </input>
                    <input type='text' placeholder='last name'
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}>
                    </input>
                    <button onClick={register}>Sign Up</button>
                </form>
            </div>
        </>

    )
}



export default SignUp;