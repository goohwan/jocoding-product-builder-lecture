// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAHFjXbhAgcMCqS-wseY3TXyQbF_xDLgoU",
  authDomain: "food-db-9a00a.firebaseapp.com",
  projectId: "food-db-9a00a",
  storageBucket: "food-db-9a00a.appspot.com",
  messagingSenderId: "253957620368",
  appId: "1:253957620368:web:8db835b6ae7d2bf2c2ce15",
  measurementId: "G-L6LZP9K1SF"
};

// Initialize Firebase
let app;
let db;
let analytics;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    analytics = getAnalytics(app);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.warn("Firebase initialization failed. Please check your firebaseConfig in firebase.js.");
    console.error(error);
}

export { db, doc, getDoc, setDoc, collection, addDoc, query, where, getDocs };
