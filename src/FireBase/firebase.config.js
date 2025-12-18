// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLQUhDSDz74qftnbzrdW90ZAKrBSJ58Sw",
  authDomain: "local-chef-bazaar-42865.firebaseapp.com",
  projectId: "local-chef-bazaar-42865",
  storageBucket: "local-chef-bazaar-42865.firebasestorage.app",
  messagingSenderId: "713249845308",
  appId: "1:713249845308:web:cfd3b078a9310ac903d339"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
