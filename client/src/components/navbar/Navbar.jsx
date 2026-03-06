import "./Navbar.css";

import {
  FaBars,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaTimes,
  FaUserFriends,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import AuthContext from "../../authContext/AuthContext";
import Logo from "/assets/favicon/webDevProF.png";
import ThemeContext from "../../themeContext/ThemeContext";

const Navbar = () => {
  const { user, setUser, handleSignOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const routes = [
    { id: 1, route: "/", name: "Home" },
    { id: 2, route: "/about-me", name: "About Me" },
    { id: 3, route: "/contact-me", name: "Contact" },
    { id: 4, route: "/blog-coming-soon", name: "Blog Coming Soon" },
    user ? { id: 5, route: "/bookmarked-page", name: "My Bookmarks" } : "",
    // { id: 6, route: "/rss", name: "Rss" },
    {
      id: 6,
      route: "http://localhost:3000/api/blogs/rss",
      name: "Rss",
      external: true,
    },
    { id: 7, route: "/user-profile", name: "Profile" },
    {
      id: 8,
      route: "/notice",
      name: "Notice",
    },
    {
      id: 9,
      isThemeToggle: true, // Differentiator key
    },
  ];

  const handleLogOut = async () => {
    try {
      await handleSignOut()
        .then(() => {
          setUser(null);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error during Sign-Out:", error.message);
        });
    } catch (error) {
      console.error("Error during Sign-Out:", error.message);
    }
  };
  return (
    <div
      className={`navbar ${
        theme === "dark" ? "bg-gray-800" : "bg-base-200"
      } lg:px-0 lg:bg-base-200 md:py-0 shadow-md fixed top-0 lg:max-w-full mx-auto z-50 lg:top-0 pt-0 mt-0`}
    >
      <div className="navbar dark:bg-gray-800 lg:px-[7rem]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <div
                className="md:hidden text-2xl dropdown"
                onClick={() => handleOpen(setOpen(!open))}
              >
                {open === true ? (
                  <FaTimes className="m- w-7 h-7 border-2 border-slate-300 p-1 rounded-sm" />
                ) : (
                  <FaBars className="m- w-7 h-7  border-2 border-slate-300 p-1 rounded-sm" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`bg-base-200 border lg:hidden md:hidden lg:ml-2 -ml-2 space-y-1 z-[1] shadow-lg w-96 absolute duration-1000 md:static rounded-b-md ${
                open ? "top-[65px]" : "-top-72"
              } dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:shadow-lg`}
            >
              {routes.map((item, index) =>
                item ? (
                  item.isThemeToggle ? ( // Check for the theme toggle button
                    <li key={index}>
                      <button
                        className={`theme-toggle-btn items-center ml-3 ${theme}`}
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? <FaMoon /> : <FaSun />}
                      </button>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <a href={item.route}>{item.name}</a>
                    </li>
                  )
                ) : null,
              )}
            </ul>
          </div>

          <img src={Logo} alt="Logo" className="lg:w-14 lg:h-14 h-8 w-8" />

          <Link to="/" className="ml-0">
            <span className="xl:text-xl xl:w-48 md:w-32 lg:block xl:block lg:text-xs md:hidden md:ml-0 hidden lg:font-bold text-emerald-500">
              Blog
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden md:block lg:flex">
          <ul className="menu-horizontal">
            {routes.map((route, index) => (
              <li key={index} className="">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to={route.route}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
            <li className="flex items-center lg:ml-">
              <button
                className={`theme-toggle-btn ${theme}`}
                onClick={toggleTheme}
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
            </li>
          </ul>
        </div>
        <div className="navbar-end dark:bg-gray-800 bg-red-500s">
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className=" dark:bg-gray-800 border-none">
              <div className="flex items-center gap-2 cursor-pointer">
                {user ? (
                  user.photoURL ? (
                    <>
                      <div className="flex items-center space-x-1">
                        <span className="text-[8px] lg:text-sm capitalize hidden lg:block">
                          {user ? user.displayName : ""}
                        </span>
                        <img
                          src={user.photoURL}
                          alt="Profile pic"
                          className="lg:w-12 lg:h-12 w-8 h-8 p-0.5 border-2 border-slate-300 rounded-full object-contain shadow-sm"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] shadow-xl bg-base-200 p-2 space-y-2 dark:bg-slate-700 rounded-md w-56 cursor-pointer"
            >
              {user ? (
                <>
                  <li className="text-xs capitalize bg-base-300 rounded-md p-2 dark:bg-slate-800 dark:text-white">
                    Name: {user?.displayName}
                  </li>
                  <li className="text-xs bg-base-300 rounded-sm p-2 dark:bg-slate-800 dark:text-white">
                    Email: {user?.email}
                  </li>
                  <button
                    className="btn btn-sm bg-base-200 capitalize dark:text-slate-300 dark:bg-gray-800 dark:border-none"
                    onClick={handleLogOut}
                  >
                    <FaSignOutAlt />
                    <span> Logout</span>
                  </button>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="flex justify-end items-center">
            {user ? (
              <button
                className="btn btn-sm bg-base-200 capitalize dark:text-slate-300 dark:bg-gray-800 dark:border-none"
                onClick={handleLogOut}
              >
                <FaSignOutAlt />
                <span className="hidden lg:block">Logout</span>
              </button>
            ) : (
              <>
                <NavLink to="/login" className="flex items-center">
                  <FaSignInAlt className="mr-1" />
                  <span className="hidden md:block">Login</span>
                </NavLink>
                <NavLink to="/register" className="flex items-center">
                  <FaUserFriends className="mr-1" />
                  <span className="hidden md:block">Signup</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
