// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOwz1MM3IrAqbC_u1h0JJQrJ-cFu-qdjM",
  authDomain: "edurise-81107.firebaseapp.com",
  projectId: "edurise-81107",
  storageBucket: "edurise-81107.firebasestorage.app",
  messagingSenderId: "89215853364",
  appId: "1:89215853364:web:8ff99e98729b0931613b61",
  measurementId: "G-DXN06SN2B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =initializeAuth(app,{
     persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})

export const db = getFirestore(app)
const analytics = getAnalytics(app);