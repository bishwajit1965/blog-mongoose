import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

import AuthContext from "../authContext/AuthContext";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("USER", user);

  // Create a new user with email and password
  const registerUserWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during email/password Sign-Up:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signInWithEmailPassword = async (auth, email, password) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during email/password Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  //Sign in with google popup
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with GitHub popup
  const signInWithGitHub = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, gitHubProvider);
    } catch (error) {
      console.error("Error during GitHub Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  // Log out
  const handleSignOut = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        console.log("Logged in user data:", currentUser);
        const token = await currentUser.getIdToken();
        console.log("object", token);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    auth,
    loading,
    registerUserWithEmailAndPassword,
    signInWithEmailPassword,
    signInWithGoogle,
    signInWithGitHub,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
