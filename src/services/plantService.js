// Plant-related Firestore operations
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

const plantsCollection = collection(db, 'plants');

export async function getPlantsForUser(userId) {
  const q = query(plantsCollection, where('ownerId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addPlant(userId, plant) {
  // Ensure frequency is stored as a number and calculate initial nextWateringDate
  const frequency = parseInt(plant.frequency) || 7;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + frequency);

  const newPlant = {
    ...plant,
    frequency: frequency,
    ownerId: userId,
    createdAt: Timestamp.now(),
    lastWateredDate: Timestamp.now().toDate().toISOString(),
    nextWateringDate: nextDate.toISOString()
  };

  const docRef = await addDoc(plantsCollection, newPlant);
  return { id: docRef.id, ...newPlant };
}

// --- NEW FUNCTIONS TO FIX THE UI ERRORS ---

/**
 * Updates the watering dates in Firestore
 */
export async function waterPlant(userId, plantId) {
  const plantRef = doc(db, 'plants', plantId);
  
  // We need to fetch the plant to know its frequency to calculate the next date
  // Alternatively, you can pass frequency as an argument to this function
  const plants = await getPlantsForUser(userId);
  const plant = plants.find(p => p.id === plantId);
  
  const frequency = parseInt(plant?.frequency) || 7;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + frequency);

  await updateDoc(plantRef, {
    lastWateredDate: new Date().toISOString(),
    nextWateringDate: nextDate.toISOString()
  });
}

/**
 * Removes a plant from Firestore
 */
export async function deletePlant(userId, plantId) {
  const plantRef = doc(db, 'plants', plantId);
  await deleteDoc(plantRef);
}