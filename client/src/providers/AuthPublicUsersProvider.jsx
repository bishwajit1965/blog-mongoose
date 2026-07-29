import { useCallback, useEffect, useState } from "react";
import AuthPublicUsersContext from "../authContext/AuthPublicUsersContext";
import { getAllMongoUsers } from "../services/mongoUsersApiService";

const AuthPublicUsersProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [publicUsers, setPublicUsers] = useState(null);

  const fetchPublicUsers = useCallback(async () => {
    try {
      setLoading(true);
      const [publicUsersResponse] = await Promise.all([getAllMongoUsers()]);
      if (publicUsersResponse) {
        setPublicUsers(publicUsersResponse?.mongoUsers);
      }
    } catch (error) {
      console.error("Error in fetching public users.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicUsers();
  }, [fetchPublicUsers]);

  const publicUsersInfo = { loading, publicUsers, fetchPublicUsers };
  return (
    <AuthPublicUsersContext.Provider value={publicUsersInfo}>
      {children}
    </AuthPublicUsersContext.Provider>
  );
};

export default AuthPublicUsersProvider;
