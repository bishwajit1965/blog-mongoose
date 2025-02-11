import { FaArrowAltCircleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const EditorFeatures = () => {
  const editorRoutesFeatures = [
    { id: 1, route: "editor-dashboard", name: "Dashboard HomeE" },
    { id: 2, route: "manage-blogs", name: "Manage Blog PostsE" },
  ];
  return (
    <div className="dark:bg-gray-800 bg-base-200 border-b border-gray-200 shadow-sm rounded-b-sm dark:border-gray-700">
      <div className="lg:space-y-2 p-2">
        {editorRoutesFeatures.map((path) => (
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

export default EditorFeatures;
