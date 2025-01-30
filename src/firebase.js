import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCWLyYg6oVa9j_UwH2TCZe3zjIWnLGdo6E",
  authDomain: "recipe-ad5ef.firebaseapp.com",
  projectId: "recipe-ad5ef",
  storageBucket: "recipe-ad5ef.firebasestorage.app",
  messagingSenderId: "384026264816",
  appId: "1:384026264816:web:11ad3fcefd8727e815ae35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;