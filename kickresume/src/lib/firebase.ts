// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD76t4ghh3WC_XXGgXfoR05OF96purDOg8",
  authDomain: "resume-builder-5b66a.firebaseapp.com",
  projectId: "resume-builder-5b66a",
  storageBucket: "resume-builder-5b66a.appspot.com",
  messagingSenderId: "114702850200",
  appId: "1:114702850200:web:f202f12a33f79dd48498ed",
  measurementId: "G-4BHJP87N64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
