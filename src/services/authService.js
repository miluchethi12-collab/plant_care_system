// Simple authentication helper that talks to Firestore directly.
// This is NOT secure and only for demonstration. In real apps use
// Firebase Authentication or another proven auth system.

import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const usersCollection = collection(db, 'users');

export async function registerUser(email, password, name) {
  // naive check to see if user already exists
  const q = query(usersCollection, where('email', '==', email));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    throw new Error('User already exists');
  }
  const doc = await addDoc(usersCollection, { email, password, name });
  return { id: doc.id, email, name };
}

export async function loginUser(email, password) {
  const q = query(usersCollection, where('email', '==', email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    throw new Error('No such user');
  }
  const userDoc = snapshot.docs[0];
  const data = userDoc.data();
  if (data.password !== password) {
    throw new Error('Incorrect password');
  }
  return { id: userDoc.id, email: data.email, name: data.name };
}
