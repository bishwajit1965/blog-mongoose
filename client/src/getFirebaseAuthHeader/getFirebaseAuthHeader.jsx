import { getAuth } from "firebase/auth";

/**
 * Can be used anywhere, not just React components
 */
export const getFirebaseAuthHeader = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return null; // ← DO NOT THROW
  }

  const token = await user.getIdToken(false);
  return { Authorization: `Bearer ${token}` };
};
