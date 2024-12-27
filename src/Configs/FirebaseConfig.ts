import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_N9KoDI6TWTIK2kopDFzTvyeks-irfm0",
  authDomain: "langrocket.firebaseapp.com",
  projectId: "langrocket",
  storageBucket: "langrocket.firebasestorage.app",
  messagingSenderId: "51590582942",
  appId: "1:51590582942:web:69f18f8945a64247d9a18f",
  measurementId: "G-LHK2LD7Y34",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export default firebaseAuth;
