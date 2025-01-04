import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import AuthContext from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Navbar = () => {
  const { user, setUser, handleSignOut } = useContext(AuthContext);

  const logOut = async () => {
    try {
      await handleSignOut()
        .then(() => {
          setUser(null);
        })
        .catch((error) => {
          console.error("Error during Sign-Out:", error.message);
        });
    } catch (error) {
      console.error("Error during Sign-Out:", error.message);
    }
  };
  return (
    <div className="bg-base-300">
      <div className="flex justify-between items-center p-4 shadow-md">
        <div className="text-lg font-bold">Blog</div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <img
                src={user?.photoURL}
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm font-semibold">{user?.displayName}</div>
            </>
          ) : (
            <div className="text-sm font-semibold">Guest</div>
          )}

          {user ? (
            <button onClick={logOut} className="btn btn-xs btn-secondary">
              <FaSignOutAlt />
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-xs btn-primary">
                <FaSignInAlt />
                Log in
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
