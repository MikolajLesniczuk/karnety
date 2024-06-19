// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQxe19YEv_-RBTtg1N3b-qvVjG7qufzsY",
  authDomain: "karnety-73efa.firebaseapp.com",
  projectId: "karnety-73efa",
  storageBucket: "karnety-73efa.appspot.com",
  messagingSenderId: "57355623775",
  appId: "1:57355623775:web:a9161a6460536f5e0d2aea",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
