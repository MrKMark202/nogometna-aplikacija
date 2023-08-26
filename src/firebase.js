import firebase from 'firebase/compat/app'
import { doc, addDoc, getDoc, setDoc, getDocs, getFirestore, collection, query, where, deleteDoc} from 'firebase/firestore/lite'
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBfe_rWCxRrfBtR3M-G0-HueFHXcJAqh9s",
  authDomain: "nogometna--aplikacija.firebaseapp.com",
  projectId: "nogometna--aplikacija",
  storageBucket: "nogometna--aplikacija.appspot.com",
  messagingSenderId: "892676413382",
  appId: "1:892676413382:web:9a524de1466fd206a304c7",
  measurementId: "G-SP5L1LBWPX"
};

//firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);


export { app, auth, storage, db,
  getAuth,
  doc,
  getDoc,
	setDoc,
  addDoc,
	createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  collection,
  query,
  getDocs,
  where,
  deleteDoc, 
}