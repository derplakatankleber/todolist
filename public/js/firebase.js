import { initializeApp } from 'firebase/app';
// import * as auth from 'firebase/auth';
//import * as firestore from 'firebase/firestore';
import { signOut, getAuth, signInWithEmailAndPassword, setPersistence, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore, query, getDocs, collection, doc, getDoc, addDoc, deleteDoc, setDoc } from './firebaseStore.js';

//import { initializeApp } from 'firebase/app';
// import * as auth from 'firebase/auth';
// import * as firestore from 'firebase/firestore';


//import { getMessaging } from 'firebase/messaging/sw';
const firebaseConfig = require('../../firebase-config.json');

const firebaseApp = initializeApp(firebaseConfig);
console.info('user: ' + getAuth().currentUser);
//getMessaging(firebaseApp);

window.firebase = {};
window.firebase.app = firebaseApp;
// window.firebase.auth = auth;
// window.firebase.firestore = firestore;
// window.firebase.db = firestore.getFirestore();
window.firebase.db = getFirestore();

console.log('firebase bind completed.');

export { signOut, getAuth, signInWithEmailAndPassword, setPersistence, initializeAuth, browserLocalPersistence } from "firebase/auth";
export { getFirestore, query, getDocs, collection, doc, getDoc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
