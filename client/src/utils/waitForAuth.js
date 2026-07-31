import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const waitForAuth = () =>
  new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

export default waitForAuth;
