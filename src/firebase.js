// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMw_hZaYZgWbKiv_JnxbS69eLu7hM7xos",
  authDomain: "reactchat-dc001.firebaseapp.com",
  projectId: "reactchat-dc001",
  storageBucket: "reactchat-dc001.appspot.com",
  messagingSenderId: "1094748599132",
  appId: "1:1094748599132:web:307e6985576c0ba3310799",
  measurementId: "G-N9CC490FP6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);
