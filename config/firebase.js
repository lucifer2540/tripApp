// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC49GmmOKX8pdkI0vR5VIoA5gAhpeQ_HPo",
  authDomain: "happyify-ae436.firebaseapp.com",
  projectId: "happyify-ae436",
  storageBucket: "happyify-ae436.appspot.com",
  messagingSenderId: "783891218997",
  appId: "1:783891218997:web:63a2ad874039a25bee677c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const tripRef = collection(db,'trips');
export const expensesRef = collection(db,'expenses');

export default app;
