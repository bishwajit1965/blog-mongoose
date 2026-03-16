import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const useFirebaseAuthHeader = () => {
  const [header, setHeader] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const updateHeader = async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        setHeader({ Authorization: `Bearer ${token}` });
      } else {
        setHeader(null);
      }
    };

    // Initial fetch
    updateHeader();

    // Listen for token refreshes
    const unsubscribe = auth.onIdTokenChanged(updateHeader);
    return () => unsubscribe();
  }, []);

  return header;
};
