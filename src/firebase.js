// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "zen-backend.firebaseapp.com",
  projectId: "zen-backend",
  storageBucket: "zen-backend.appspot.com",
  messagingSenderId: "816294930039",
  appId: "1:816294930039:web:9e63e859909f98532b0872",
  measurementId: "G-V8CSNWT2QM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db= getFirestore(app)