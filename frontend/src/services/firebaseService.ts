import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, where, Timestamp } from 'firebase/firestore';

export interface DetectionEvent {
  id?: string;
  userId?: string;
  timestamp: Timestamp;
  detectionResult: 'Mask' | 'No Mask';
  confidence: number;
  source: 'upload' | 'camera' | 'api';
  imageUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id?: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Timestamp;
  lastLogin: Timestamp;
}

export interface MaskViolation {
  id?: string;
  userId?: string;
  timestamp: Timestamp;
  confidence: number;
  imageUrl?: string;
  resolved: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Detection Events Collection
export const detectionEventsCollection = collection(db, 'detectionEvents');
export const usersCollection = collection(db, 'users');
export const maskViolationsCollection = collection(db, 'maskViolations');

// Add detection event
export const addDetectionEvent = async (event: Omit<DetectionEvent, 'id'>) => {
  try {
    const docRef = await addDoc(detectionEventsCollection, {
      ...event,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding detection event:', error);
    throw error;
  }
};

// Add mask violation
export const addMaskViolation = async (violation: Omit<MaskViolation, 'id'>) => {
  try {
    const docRef = await addDoc(maskViolationsCollection, {
      ...violation,
      timestamp: Timestamp.now(),
      resolved: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding mask violation:', error);
    throw error;
  }
};

// Add user
export const addUser = async (user: Omit<User, 'id'>) => {
  try {
    const docRef = await addDoc(usersCollection, {
      ...user,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Listen to recent detection events
export const listenToRecentDetections = (callback: (events: DetectionEvent[]) => void) => {
  const q = query(
    detectionEventsCollection,
    orderBy('timestamp', 'desc'),
    limit(50)
  );

  return onSnapshot(q, (snapshot) => {
    const events: DetectionEvent[] = [];
    snapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() } as DetectionEvent);
    });
    callback(events);
  });
};

// Listen to unresolved mask violations
export const listenToUnresolvedViolations = (callback: (violations: MaskViolation[]) => void) => {
  const q = query(
    maskViolationsCollection,
    where('resolved', '==', false),
    orderBy('timestamp', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const violations: MaskViolation[] = [];
    snapshot.forEach((doc) => {
      violations.push({ id: doc.id, ...doc.data() } as MaskViolation);
    });
    callback(violations);
  });
};

// Listen to user-specific detection events
export const listenToUserDetections = (userId: string, callback: (events: DetectionEvent[]) => void) => {
  const q = query(
    detectionEventsCollection,
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(20)
  );

  return onSnapshot(q, (snapshot) => {
    const events: DetectionEvent[] = [];
    snapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() } as DetectionEvent);
    });
    callback(events);
  });
};