// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dee-buildings.firebaseapp.com",
  projectId: "dee-buildings",
  storageBucket: "dee-buildings.appspot.com",
  messagingSenderId: "888796430370",
  appId: "1:888796430370:web:1b79f9b1df1fe71d5f4a7b",
  measurementId: "G-0NS4WPQK33",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
