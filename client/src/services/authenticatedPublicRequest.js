import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const authenticatedPublicRequest = async () => {
  const currentUser = auth.currentUser;
  console.log("CURRENT USER", currentUser);

  if (!currentUser) {
    return {};
  }

  const token = await currentUser.getIdToken();
  console.log("TOKEN", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default authenticatedPublicRequest;
