// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzF5aPqM4tBMzj64szjHZBYe5XUNEsWjg",
  authDomain: "dts-react.firebaseapp.com",
  projectId: "dts-react",
  storageBucket: "dts-react.appspot.com",
  messagingSenderId: "890251659686",
  appId: "1:890251659686:web:1333947be84b96f8f46767",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registrasi = async (email, password) =>{

    try{
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    
    } catch(err) {
        console.log(err.code);
        console.log(err.message);
    }

}

const login = async (email, password) => {
    try{
    const userLogin = await signInWithEmailAndPassword(auth, email, password);
    console.log(userLogin)
    } catch(err){
        alert("Login gagal!");
    }
}

const logout = async () => {
    try{
        await signOut(auth);
    } catch(err) {
        alert(err)
    }
}

export {auth, registrasi, login, logout};