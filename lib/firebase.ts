// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKIjsyhQPCCXt-00ZFPIx0e_7Jdmd7Gw8",
  authDomain: "karthi-nexgen-tech.firebaseapp.com",
  projectId: "karthi-nexgen-tech",
  storageBucket: "karthi-nexgen-tech.firebasestorage.app",
  messagingSenderId: "202807592240",
  appId: "1:202807592240:web:3ed4f66a14b2557c6ef4f5",
  measurementId: "G-DK4VK332PY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, analytics };
