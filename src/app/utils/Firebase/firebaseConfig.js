// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkVZSxnUFpDpGdEmICd08Vk7oMoMxaisI",
  authDomain: "dashcam-microsite.firebaseapp.com",
  projectId: "dashcam-microsite",
  storageBucket: "dashcam-microsite.firebasestorage.app",
  messagingSenderId: "956612787679",
  appId: "1:956612787679:web:b49da7c6f725920767d86a",
  measurementId: "G-4WT43MR8XQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth =getAuth(app)

export { db, storage,auth };

