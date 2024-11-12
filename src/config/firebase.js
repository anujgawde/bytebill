import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMP5ZeoatQtlORGObPBwasqJn86gtxxXE",
  authDomain: "bytebill-5431d.firebaseapp.com",
  projectId: "bytebill-5431d",
  storageBucket: "bytebill-5431d.firebasestorage.app",
  messagingSenderId: "977784798952",
  appId: "1:977784798952:web:c84b51f947c08744b8935d",
  measurementId: "G-PJPBP36PJD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
