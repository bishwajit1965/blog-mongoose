import "./AdminNavbar.css";

import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import Logo from "/assets/favicon/webDevProF.png";
import ThemeContext from "../../../themeContext/ThemeContext";
import adminImage from "/assets/bishwajit-1.jpg";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const AdminNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const { logoutAdmin, adminData } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/login";

  // Logout admin
  const handleLogOut = async () => {
    try {
      await logoutAdmin()
        .then(() => {
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.error("Error during Sign-Out:", error.message);
        });
    } catch (error) {
      console.error("Error during Sign-Out:", error.message);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const routes = [
    { id: 1, route: "admin-dashboard", name: " Dashboard Home" },
    { id: 2, route: "manage-blogs", name: "Manage Blog Posts" },
    {
      id: 3,
      isThemeToggle: true, // Differentiator key
    },
  ];

  return (
    <div>
      <div className="navbar bg-base-200 dark:bg-gray-800 border-b dark:border-b-gray-700">
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
              className={`bg-base-200 border lg:hidden md:hidden lg:ml-2 -ml-4 space-y-1 z-[1] shadow-lg w-96 absolute duration-1000 md:static rounded-b-md ${
                open ? "top-[65px]" : "-top-72"
              } dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:shadow-lg`}
            >
              {routes.map((item) =>
                item ? (
                  item.isThemeToggle ? ( // Check for the theme toggle button
                    <li key={item.id}>
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
                ) : null
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
            {routes.map((route) => (
              <li key={route.id} className="">
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
            <li className="flex items-center lg:ml-8">
              <button
                className={`theme-toggle-btn ${theme}`}
                onClick={toggleTheme}
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {/* <a className="btn">Button</a> */}
          <span className="mr-2 capitalize">{adminData?.roles}</span>
          <div className="dropdown dropdown-end dark:bg-gray-800">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={adminImage} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-gray-700"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>

              {adminData ? (
                <>
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/admin/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
