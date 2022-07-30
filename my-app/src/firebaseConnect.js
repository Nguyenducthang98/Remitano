import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyC_xBMqBcwdkLN5hIL4P9rOx4YjiGBVDSQ",
  authDomain: "shopreact-e22d3.firebaseapp.com",
  databaseURL: "https://shopreact-e22d3.firebaseio.com",
  projectId: "shopreact-e22d3",
  storageBucket: "shopreact-e22d3.appspot.com",
  messagingSenderId: "522288151605",
  appId: "1:522288151605:web:48b0cdb3eae62f048dc57c",
  measurementId: "G-C4CPK0TXD0",
};
// Initialize Firebase
const firebaseData = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(firebaseData);
const database = getDatabase(firebaseData);

export { auth, firebaseData, firestore, database };
