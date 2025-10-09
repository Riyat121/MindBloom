// firebase.js - add your Firebase web app config below
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the config object below with your Firebase project's config
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8cxnGedId_I8y0zC8uS5mRRdxTseEOSQ",
  authDomain: "mindbloom-database.firebaseapp.com",
  projectId: "mindbloom-database",
  storageBucket: "mindbloom-database.firebasestorage.app",
  messagingSenderId: "812181366157",
  appId: "1:812181366157:web:6707db8b8b0fe0f36a49c4"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword };
