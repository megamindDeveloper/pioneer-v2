// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP1H_Hdv8ZYXPbX_cJtEYkfgHXBfMrYAI",
  authDomain: "pioneer-test-3a845.firebaseapp.com",
  projectId: "pioneer-test-3a845",
  storageBucket: "pioneer-test-3a845.firebasestorage.app",
  messagingSenderId: "624279376626",
  appId: "1:624279376626:web:8c3911a68ffee6eee0f66b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth =getAuth(app)

export { db, storage,auth };

