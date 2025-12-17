import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Your Firebase project config (replace these values with yours)
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

// Setup Google Provider
const provider = new GoogleAuthProvider();

// ------------------
// Google Sign-In Function
// ------------------
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Optionally: Create or update a Firestore document for the user
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// ------------------
// Export everything else
// ------------------
export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
};
