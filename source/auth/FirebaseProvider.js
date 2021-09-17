import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore/lite"

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
const firestoreDb = getFirestore();

export const FirebaseContext = createContext();

export default (props) => {
  const [isGettingStoredUser, setIsGettingStoredUser] = useState(true)
  const [user, setUser] = useState(null)

  const getStoredUser = async () => {
    try {
      storedUser = await SecureStore.getItemAsync('user');
      setUser(JSON.parse(storedUser))
    }
    finally {
      setIsGettingStoredUser(false)
    }
  }
  
  const setStoredUser = (user) => {
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

  const getPlaidItems = async () => {
    // if (!user) throw 'user must be logged in to save to firestore'
  
    const items = await getDocs(collection(firestoreDb, "plaiditems"));

    return items.docs.map((item) => item.data())
  }

  const savePlaidItem = async (itemId, accessToken) => {
    if (!user) throw 'user must be logged in to save to firestore'

    const item = await addDoc(collection(firestoreDb, "plaiditems"), {
      uid: user.uid,
      itemId,
      accessToken,
    });

    return item.id
  }

  const context = {
    app,
    auth,
    firestoreDb,
    getPlaidItems,
    savePlaidItem,
    user,
    isGettingStoredUser,
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