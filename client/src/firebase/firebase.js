import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Firebase Config (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyA8A_O4Lok3Lz2HW_728McbSxlQemID8fY",
    authDomain: "job-task-a9522.firebaseapp.com",
    projectId: "job-task-a9522",
    storageBucket: "job-task-a9522.firebasestorage.app",
    messagingSenderId: "511891943319",
    appId: "1:511891943319:web:3c75ad983485ba8ca8ded2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

// Sign-Out Function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export { auth, signInWithGoogle, logout };