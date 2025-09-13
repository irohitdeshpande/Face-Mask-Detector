import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-7NCNRRR4HJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Getting the Auth instance from Firebase
const auth: Auth = getAuth(firebaseApp);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export { auth, firebaseApp, db };
