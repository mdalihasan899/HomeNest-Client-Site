// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY_xWnZmgWMkJP2aonIeUfP8hlfsbyeG4",
  authDomain: "my-best-project-9056f.firebaseapp.com",
  projectId: "my-best-project-9056f",
  storageBucket: "my-best-project-9056f.firebasestorage.app",
  messagingSenderId: "962522315711",
  appId: "1:962522315711:web:73d735d1345ac7e89f7f0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);