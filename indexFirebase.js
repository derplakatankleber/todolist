import { initializeApp } from 'firebase/app';
// import * as auth from 'firebase/auth';
//import * as firestore from 'firebase/firestore';
import { signOut, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore,query,getDocs,collection, doc, getDoc,addDoc, deleteDoc, setDoc} from 'firebase/firestore';
