import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc6x5s1yonZGr90_vPWODrn-Tjl_FLrEM",
  authDomain: "battery-store-1d560.firebaseapp.com",
  projectId: "battery-store-1d560",
  storageBucket: "battery-store-1d560.appspot.com",
  messagingSenderId: "207294258123",
  appId: "1:207294258123:web:962e481a157869e6e3744e"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)