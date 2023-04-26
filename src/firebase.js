import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0rUieOUim2fm1fMcdCRKLPshLXgfhWE0",
  authDomain: "shopzone-auth.firebaseapp.com",
  projectId: "shopzone-auth",
  storageBucket: "shopzone-auth.appspot.com",
  messagingSenderId: "334429767126",
  appId: "1:334429767126:web:3add877c2a887794ec5077"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);