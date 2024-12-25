import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8FW2IdzpUKCqZU15Cc3hl5Euqurfbe04",
  authDomain: "native-2e045.firebaseapp.com",
  projectId: "native-2e045",
  storageBucket: "native-2e045.firebasestorage.app",
  messagingSenderId: "1076667537163",
  appId: "1:1076667537163:web:bc6b5a7813684e594c340e",
  measurementId: "G-L1TN8Q0KST",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default firebaseConfig;
