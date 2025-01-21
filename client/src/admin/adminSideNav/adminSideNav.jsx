import { FaArrowAltCircleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSideNav = () => {
  const routes = [
    { id: 1, route: "admin-home-dashboard", name: " Dashboard Home" },
    { id: 2, route: "manage-blogs", name: "Manage Blog Posts" },
    { id: 3, route: "manage-categories", name: "Manage Categories" },
    { id: 4, route: "manage-tags", name: "Manage Tags" },
    { id: 5, route: "manage-users", name: "Manage Users" },
    { id: 6, route: "manage-roles", name: "Manage Roles" },
    { id: 7, route: "manage-permission", name: "Manage Permission" },
  ];

  return (
    <div className="dark:bg-gray-800">
      <div className="lg:py-[23px] bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
        <h1 className="text-xl font-bold text-center">Admin Navigation</h1>
      </div>
      <div className="lg:space-y-2 p-2">
        {routes.map((path) => (
          <NavLink
            key={path.id}
            to={path.route}
            className="m-0 flex items-center hover:link-neutral hover:font-bold dark:hover:link-success hover:animate-pulse"
          >
            <FaArrowAltCircleRight className="mr-2 hover:animate-spin" />{" "}
            {path.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSideNav;
