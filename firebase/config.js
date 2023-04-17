// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQzFbA5gkaagYqE5-vod-wypUQ_p0PfRg",
  authDomain: "firstnative-b7be3.firebaseapp.com",
  projectId: "firstnative-b7be3",
  storageBucket: "firstnative-b7be3.appspot.com",
  messagingSenderId: "786589115411",
  appId: "1:786589115411:web:9e6c02e000c7c9d0994be6",
  measurementId: "G-XEWRQ8Z701",
  // databaseURL: "https://firstnative-b7be3-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export default firebase.initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage();

// Initialize
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
