import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
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
  const sendUserToBackend = async (token) => {
    try {
      const response = await api.post(
        "/users/register",
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, //Send token as a bearer token
          withCredentials: true, // Allow cookie
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error in sending token to backend.",
        error.response?.data || error.message
      );
    }
  };

  // Handle user authentication
  const handleUserAuthentication = useCallback(async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      const userData = await sendUserToBackend(token);
      setUser({ ...firebaseUser, ...userData });
      setUser(firebaseUser);
    } catch (error) {
      console.error("Error during authentication", error);
      throw error;
    }
  }, []); // Add dependencies if the function depends on external variables

  // Create a new user with email and password
  const registerUserWithEmailAndPassword = async (
    email,
    password,
    name,
    photoUrl
  ) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await handleUserAuthentication(userCredential.user);

      const firebaseUid = userCredential.user.uid;
      // Prepare data to send to backend
      const userData = {
        firebaseUid,
        email,
        name,
        password,
        photoUrl,
        roles: ["user"], // assign default role
      };

      // Save user data to MongoDB
      const response = await api.post("/users/register", userData);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || "Failed to save user data to MongoDB."
        );
      }
      console.log("User saved to MongoDB.", result.user);
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
        password
      );
      await handleUserAuthentication(userCredential.user);
      return userCredential;
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
