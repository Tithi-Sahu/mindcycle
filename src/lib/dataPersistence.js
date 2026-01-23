// Data persistence utilities for both Firebase and localStorage (guest mode)
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Helper function to get storage key for guest users
const getGuestStorageKey = (userId, collection) => `guest_${collection}_${userId}`;

// Generic fetch function
export const fetchData = async (collectionName, userId, isGuest) => {
  if (isGuest) {
    const key = getGuestStorageKey(userId, collectionName);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } else {
    const q = query(
      collection(db, collectionName),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  }
};

// Generic add function
export const addData = async (collectionName, userId, data, isGuest) => {
  const itemData = {
    ...data,
    userId,
    createdAt: new Date().toISOString(),
  };

  if (isGuest) {
    const key = getGuestStorageKey(userId, collectionName);
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    const newItem = { id: Date.now().toString(), ...itemData };
    existingData.unshift(newItem);
    localStorage.setItem(key, JSON.stringify(existingData));
    return newItem;
  } else {
    const docRef = await addDoc(collection(db, collectionName), itemData);
    return { id: docRef.id, ...itemData };
  }
};

// Generic update function
export const updateData = async (collectionName, itemId, userId, updates, isGuest) => {
  if (isGuest) {
    const key = getGuestStorageKey(userId, collectionName);
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    const index = existingData.findIndex(item => item.id === itemId);
    if (index !== -1) {
      existingData[index] = { ...existingData[index], ...updates };
      localStorage.setItem(key, JSON.stringify(existingData));
      return existingData[index];
    }
    throw new Error('Item not found');
  } else {
    await updateDoc(doc(db, collectionName, itemId), updates);
    return { id: itemId, ...updates };
  }
};

// Generic delete function
export const deleteData = async (collectionName, itemId, userId, isGuest) => {
  if (isGuest) {
    const key = getGuestStorageKey(userId, collectionName);
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    const filteredData = existingData.filter(item => item.id !== itemId);
    localStorage.setItem(key, JSON.stringify(filteredData));
    return itemId;
  } else {
    await deleteDoc(doc(db, collectionName, itemId));
    return itemId;
  }
};