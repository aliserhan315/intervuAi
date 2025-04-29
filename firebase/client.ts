// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy0QcUUBmDXunzm8F_sUYklX5NLNlaDHY",
  authDomain: "intervuai-b5994.firebaseapp.com",
  projectId: "intervuai-b5994",
  storageBucket: "intervuai-b5994.firebasestorage.app",
  messagingSenderId: "782988281244",
  appId: "1:782988281244:web:6f1fa37941670ceecbb459",
  measurementId: "G-ZDWW6SCCH0",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
