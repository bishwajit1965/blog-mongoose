import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const waitForAuth = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

export default waitForAuth;
