import { useContext } from "react";
import AuthPublicUsersContext from "../authContext/AuthPublicUsersContext";

const useMongoUsers = () => {
  const context = useContext(AuthPublicUsersContext);
  if (context === undefined) {
    throw new Error(
      "useMongoUsers must be used within AuthPublicUsersContext.Provider",
    );
  }

  return context;
};

export default useMongoUsers;
