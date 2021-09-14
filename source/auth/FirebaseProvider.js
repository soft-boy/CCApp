import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';
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

  const getStoredUser = async () => {
    storedUser = await SecureStore.getItemAsync('user');
    console.log(storedUser)
    setUser(JSON.parse(storedUser))
  }
  
  const setStoredUser = (user) => {
    console.log(JSON.stringify(user))
    return SecureStore.setItemAsync('user', JSON.stringify(user));
  }

  useEffect(() => {
    getStoredUser()
  }, [])

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    setStoredUser(userCredential.user)
    setUser(userCredential.user)
  }

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    setStoredUser(userCredential.user)
    setUser(userCredential.user)
  }

  const logOut = async () => {
    await signOut(auth)
    setStoredUser(null)
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