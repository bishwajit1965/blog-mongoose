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
import { useContext, useEffect, useRef, useState } from "react";

import AuthContext from "../../authContext/AuthContext";
import ThemeContext from "../../themeContext/ThemeContext";
import { getPublicAuthorData } from "../../services/publicAuthorDataService";

const Navbar = ({ systemSettings }) => {
  const settings = systemSettings?.data;
  const logo = settings?.branding?.logo?.secureUrl;
  const siteName = settings?.site?.name;
  const { user, setUser, handleSignOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState(null);
  const moreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        moreRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await getPublicAuthorData();

      if (response) {
        setAuthor(response?.data);
      }
    };

    fetchAuthor();
  }, []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  /*
  |--------------------------------------------------------------------------
  | PRIMARY NAVIGATION
  |--------------------------------------------------------------------------
  */

  const primaryRoutes = [
    {
      id: 1,
      route: "/",
      name: "Home",
    },
    {
      id: 2,
      route: "/about-me",
      name: "About",
    },
    {
      id: 3,
      route: "/contact-me",
      name: "Contact",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | SECONDARY / INFORMATIONAL NAVIGATION
  |--------------------------------------------------------------------------
  */

  const moreRoutes = [
    {
      id: 1,
      route: "/editorial-policy",
      name: "Editorial Policy",
    },
    {
      id: 2,
      route: "/privacy-policy",
      name: "Privacy Policy",
    },
    {
      id: 3,
      route: "/terms-conditions",
      name: "Terms & Conditions",
    },
    {
      id: 4,
      route: "/cookie-policy",
      name: "Cookie Policy",
    },
    {
      id: 5,
      route: "/disclaimer",
      name: "Disclaimer",
    },
    {
      id: 6,
      route: "/dmca-policy",
      name: "DMCA Policy",
    },
    {
      id: 7,
      route: "/licensing",
      name: "Licensing",
    },
    {
      id: 8,
      route: "/notice",
      name: "Notice",
    },
    {
      id: 9,
      route: "/rss",
      name: "RSS",
    },
    {
      id: 10,
      route: "/custom",
      name: "Custom",
    },
    {
      id: 11,
      route: "/blog-coming-soon",
      name: "Blog Coming Soon",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | USER-SPECIFIC NAVIGATION
  |--------------------------------------------------------------------------
  */

  const userRoutes = [
    {
      id: 1,
      route: "/bookmarked-page",
      name: "My Bookmarks",
    },
    ...(author?._id
      ? [
          {
            id: 2,
            route: `/author/${author._id}`,
            name: "Profile",
          },
        ]
      : []),
  ];

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

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
      } fixed top-0 z-50 w-full shadow-2xl lg:px-0`}
    >
      <div className="navbar w-full lg:px-[2rem] py-1 dark:bg-gray-800">
        {/* =========================================================
            LEFT / LOGO / MOBILE MENU
        ========================================================== */}

        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={handleOpen}
            >
              <div className="text-2xl">
                {open ? (
                  <FaTimes className="h-7 w-7 rounded-sm border-2 border-slate-300 p-1" />
                ) : (
                  <FaBars className="h-7 w-7 rounded-sm border-2 border-slate-300 p-1" />
                )}
              </div>
            </label>

            {open && (
              <ul
                tabIndex={0}
                className="absolute left-0 top-[4rem] z-[100] w-72 space-y-1 rounded-b-md border bg-base-200 p-2 shadow-xl dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 overflow-y-auto max-h-[70vh]"
              >
                {/* Primary */}
                {primaryRoutes.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.route}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2 ${
                          isActive
                            ? "bg-indigo-500 text-white"
                            : "hover:bg-base-300 dark:hover:bg-slate-600"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}

                {/* More */}
                <li className="mt-2 border-t border-base-content/10 pt-2">
                  <span className="px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                    More
                  </span>
                </li>

                {moreRoutes.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.route}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2 ${
                          isActive
                            ? "bg-indigo-500"
                            : "hover:bg-base-300 dark:hover:bg-slate-600"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}

                {/* User Routes */}
                {user && userRoutes.length > 0 && (
                  <>
                    <li className="mt-2 border-t border-base-content/10 pt-2">
                      <span className="px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Account
                      </span>
                    </li>

                    {userRoutes.map((item) => (
                      <li key={item.id}>
                        <NavLink
                          to={item.route}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            `block rounded-md px-3 py-2 ${
                              isActive
                                ? "bg-indigo-500"
                                : "hover:bg-base-300 dark:hover:bg-slate-600"
                            }`
                          }
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </>
                )}

                {/* Theme */}
                <li className="mt-2 border-t border-base-content/10 pt-2">
                  <button
                    className={`theme-toggle-btn ${theme} ml-3 flex items-center`}
                    onClick={toggleTheme}
                  >
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                    <span className="ml-2">
                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Desktop Logo */}
          <Link to="/" className="m-0 hidden items-center lg:flex gap-2">
            <img
              src={logo}
              alt="Nova Journal logo"
              className="h-14 w-auto rounded-xl object-contain shadow-md"
            />
            <h2 className="lg:text-2xl font-bold">{siteName}</h2>
          </Link>
        </div>

        {/* =========================================================
            DESKTOP PRIMARY NAVIGATION
        ========================================================== */}

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center px-1">
            {/* Primary routes */}
            {primaryRoutes.map((route) => (
              <li key={route.id}>
                <NavLink
                  to={route.route}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}

            {/* More Dropdown */}
            <li>
              <details ref={moreRef} className="relative">
                <summary>More</summary>

                <ul className="z-[100] w-56 rounded-md bg-base-100 p-2 shadow-xl dark:bg-slate-700">
                  {moreRoutes.map((route) => (
                    <li key={route.id}>
                      <NavLink
                        to={route.route}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        {route.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            {/* Theme */}

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center ml-6"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </ul>
        </div>

        {/* =========================================================
            RIGHT / USER AREA
        ========================================================== */}

        <div className="navbar-end dark:bg-gray-800">
          {/* Authenticated user */}
          {user ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <label
                tabIndex={0}
                className="cursor-pointer border-none dark:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="Profile pic"
                      className="h-8 w-8 rounded-full border-2 border-slate-300 object-contain p-0.5 shadow-sm lg:h-12 lg:w-12"
                    />
                  )}
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content z-[100] w-56 space-y-2 rounded-md bg-base-200 p-2 shadow-xl dark:bg-slate-700"
              >
                <li className="rounded-md bg-base-300 p-2 text-xs capitalize dark:bg-slate-800 ">
                  Name: {user?.displayName}
                </li>

                <li className="rounded-sm bg-base-300 p-2 text-xs dark:bg-slate-800 ">
                  Email: {user?.email}
                </li>

                {userRoutes.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.route}
                      className="block rounded-md p-2 text-sm hover:bg-base-300 dark:hover:bg-slate-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                <li>
                  <button
                    className="btn btn-sm w-full justify-start bg-base-200 capitalize dark:border-none dark:bg-gray-800 dark:text-slate-300"
                    onClick={handleLogOut}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* Guest */
            <div className="flex items-center gap-3">
              <NavLink to="/login" className="flex items-center">
                <FaSignInAlt className="mr-1" />
                <span className="hidden md:block">Login</span>
              </NavLink>

              <NavLink to="/register" className="flex items-center">
                <FaUserFriends className="mr-1" />
                <span className="hidden md:block">Signup</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
