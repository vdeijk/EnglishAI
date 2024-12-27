import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebaseAuth from "../Configs/FirebaseConfig";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(firebaseAuth, googleProvider);
    window.location.href = "/";
  } catch (error) {
    console.error("Google sign-in error", error);
  }
};

const signOutWithGoogle = async () => {
  try {
    await signOut(firebaseAuth);
    window.location.href = "/login";
  } catch (error) {
    console.error("Sign-out error", error);
  }
};

export { signInWithGoogle, signOutWithGoogle };
