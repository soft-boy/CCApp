import React, { createContext, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlDkDTjyFSifCV3PTcVJ03-8klrT3pm24",
  authDomain: "ramen-profit.firebaseapp.com",
  projectId: "ramen-profit",
  storageBucket: "ramen-profit.appspot.com",
  messagingSenderId: "1046744615683",
  appId: "1:1046744615683:web:876106f41fd0d270db3736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const FirebaseContext = createContext();

export default (props) => {
  const [user, setUser] = useState(null)

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    setUser(userCredential.user)
  }

  const signIn = async (email, password) => {
    console.log(email, password)
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential.user)
    setUser(userCredential.user)
  }

  const logOut = async () => {
    await signOut(auth)
    setUser(null)
  }

  const context = {
    app,
    auth,
    user,
    signUp,
    signIn,
    signOut: logOut,
  }

  return (
    <FirebaseContext.Provider value={context}>
      {props.children}
    </FirebaseContext.Provider>
  );
}