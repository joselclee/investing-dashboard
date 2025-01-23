import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAaPNHAthLGib6TOWBJbF_vQ7KALagS0YQ",
  authDomain: "investing-controller.firebaseapp.com",
  projectId: "investing-controller",
  storageBucket: "investing-controller.firebasestorage.app",
  messagingSenderId: "53809703414",
  appId: "1:53809703414:web:49225342b527ca11fd7fd7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);