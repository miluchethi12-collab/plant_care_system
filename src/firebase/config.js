// Firebase configuration and initialization
// Replace the values below with your Firebase project's credentials

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDkF2NJPw_CKPKq980e5cpYlm_HJdJxjrI",
  authDomain: "plantcare-spa-72771.firebaseapp.com",
  projectId: "plantcare-spa-72771",
  storageBucket: "plantcare-spa-72771.firebasestorage.app",
  messagingSenderId: "307625990711",
  appId: "1:307625990711:web:c5f43ba08431794f53fdb2",
  measurementId: "G-W7858KQG3X"
};

// initialize Firebase (avoid duplicate-app error when hot-reloading)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);

// For a real project you would also enable Firestore rules and/or
// Firebase Authentication. In this learning demo we keep it simple.
