import { initializeApp } from 'firebase/app';
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';


//import { getMessaging } from 'firebase/messaging/sw';
const firebaseConfig = require('./firebase-config.json');

const firebaseApp = initializeApp(firebaseConfig);
console.info('user: ' + auth.getAuth().currentUser);
//getMessaging(firebaseApp);

window.firebase={};
window.firebase.app = firebaseApp;
window.firebase.auth = auth;
window.firebase.firestore = firestore;
window.firebase.db = firestore.getFirestore();

console.log('firebase bind completed.');

import './public/js/auth.js';
import './public/js/firestore.js';
