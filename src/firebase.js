import firebase from 'firebase/compat/app'
import { doc, addDoc, getDoc, setDoc, getDocs, getFirestore, collection, query, where, deleteDoc} from 'firebase/firestore/lite'
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB_VlqSESjC5F0SrD3UAE3gqWVbQNAfn58",
  authDomain: "ball-pool-app-deaf9.firebaseapp.com",
  projectId: "ball-pool-app-deaf9",
  storageBucket: "ball-pool-app-deaf9.appspot.com",
  messagingSenderId: "457634956155",
  appId: "1:457634956155:web:de33c07d58611df26cb3de",
  measurementId: "G-ESXCYXWRF8"
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