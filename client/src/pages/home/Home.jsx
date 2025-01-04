import AuthContext from "../../authContext/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className="flex justify-center items-center 
      space-y-2"
    >
      {user ? (
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <img
              src={user?.photoURL}
              alt=""
              className="w-28 h-28 rounded-full flex"
            />
          </div>
          <h1 className="font-bold">
            {user ? `Welcome ${user?.displayName}` : "Welcome to the Home Page"}
          </h1>
          <p className="">Email: {user?.email}</p>

          <div className="">
            <p>UID: {user?.uid}</p>
          </div>

          <div className="">
            <p>Provider: {user?.providerId}</p>{" "}
          </div>

          <div className="">
            <p>Token: {user?.refreshToken}</p>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-bold justify-center">Blog Home Page</h1>
      )}
    </div>
  );
};

export default Home;
