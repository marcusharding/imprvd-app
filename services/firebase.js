import { firebaseConfig } from './credentials';
import { initializeApp, getApp } from 'firebase/app';
import { 
    getFirestore, 
    addDoc, 
    getDocs, 
    collection, 
    doc, 
    getDoc, 
    updateDoc,
    setDoc,
    arrayUnion
} from "firebase/firestore";
import { 
    initializeAuth, 
    getAuth, 
    getReactNativePersistence, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteUser,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    verifyBeforeUpdateEmail
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(firebaseConfig);

initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)});

const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;
const provider = new GoogleAuthProvider(app);

auth.useDeviceLanguage();

export {
    app, 
    user, 
    auth,
    provider,
    db,
    GoogleAuthProvider,
    updateProfile,
    signInWithPopup,
    deleteUser,
    updateEmail,
    updatePassword,
    getApp, 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    verifyBeforeUpdateEmail,
    addDoc,
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    setDoc,
    arrayUnion
};