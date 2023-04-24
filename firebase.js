// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfe_rWCxRrfBtR3M-G0-HueFHXcJAqh9s",
  authDomain: "nogometna--aplikacija.firebaseapp.com",
  projectId: "nogometna--aplikacija",
  storageBucket: "nogometna--aplikacija.appspot.com",
  messagingSenderId: "892676413382",
  appId: "1:892676413382:web:9a524de1466fd206a304c7",
  measurementId: "G-SP5L1LBWPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);