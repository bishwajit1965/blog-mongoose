import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

import AuthContext from "../authContext/AuthContext";
import api from "../services/api";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Send token to backend
  const sendUserToBackend = async (firebaseUser, token) => {
    try {
      const userData = {
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL,
      };
      const response = await api.post("/users/register", userData, {
        headers: { Authorization: `Bearer ${token}` }, //Send token as a bearer token
        withCredentials: true, // Allow cookie
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error in sending token to backend.",
        error.response?.data || error.message,
      );
    }
  };

  // Handle user authentication
  const handleUserAuthentication = useCallback(async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      const userData = await sendUserToBackend(firebaseUser, token);
      const mergedUser = {
        ...firebaseUser,
        ...(userData?.user || userData || {}),
      };
      setUser(mergedUser);
    } catch (error) {
      console.error("Error during authentication", error);
      throw error;
    }
  }, []); // Add dependencies if the function depends on external variables

  // Create a new user with email and password
  const registerUserWithEmailAndPassword = async (
    name,
    email,
    password,
    photoUrl,
  ) => {
    setLoading(true);
    try {
      const cleanName = typeof name === "string" ? name.trim() : "";
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const firebaseUser = userCredential.user;
      const displayName = cleanName || firebaseUser.displayName || "User";

      await handleUserAuthentication(firebaseUser);

      const firebaseUid = firebaseUser.uid;
      const userData = {
        firebaseUid,
        name: displayName,
        email,
        password,
        photoUrl,
        roles: ["user"],
      };

      const response = await api.post("/users/register", userData);
      console.log("User saved to MongoDB.", response.data?.user);
      return userCredential;
    } catch (error) {
      console.error("Error during email/password Sign-Up:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signInWithEmailPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await handleUserAuthentication(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error during email/password Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset user password
  const resetPassword = async (auth, email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } finally {
      setLoading(false);
    }
  };

  //Sign in with google popup
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await handleUserAuthentication(userCredential.user);
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
      const userCredential = await signInWithPopup(auth, gitHubProvider);
      await handleUserAuthentication(userCredential.user);
    } catch (error) {
      console.error("Error during GitHub Sign-In:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      console.error("Error in updating user profile.", error);
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

  // Keeps track of the user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        await handleUserAuthentication(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [handleUserAuthentication]);

  const authInfo = {
    user,
    setUser,
    auth,
    loading,
    registerUserWithEmailAndPassword,
    signInWithEmailPassword,
    resetPassword,
    signInWithGoogle,
    signInWithGitHub,
    updateUserProfile,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
