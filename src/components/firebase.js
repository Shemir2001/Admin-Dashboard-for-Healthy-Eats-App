// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9XlqCVVPi7rh-vH4NTC6EXsbSFb_KGWo",
  authDomain: "healthy-eats-92a88.firebaseapp.com",
  projectId: "healthy-eats-92a88",
  storageBucket: "healthy-eats-92a88.firebasestorage.app",
  messagingSenderId: "70317647869",
  appId: "1:70317647869:web:1e4477d17a9285629f9b94",
  measurementId: "G-6X23QYJB4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);
export const storage = getStorage(app);