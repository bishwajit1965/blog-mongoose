import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import { Helmet } from "react-helmet-async";
import useAdminAuth from "../../adminHooks/useAdminAuth";

const ManageBlogPosts = () => {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  } = useAdminAuth();

  console.log("Has the permissions:", hasPermission("create-post"));
  console.log(hasPermission("create-post"));
  console.log(hasAnyPermission(["create-post", "edit", "read"]));
  console.log(hasAllPermissions(["create-post", "edit", "read", "delete"]));
  console.log(hasRole("super-admin"));
  console.log(hasAnyRole(["super-admin", "admin"]));
  console.log(hasAllRoles(["super-admin", "admin", "editor", "writer"]));

  const len = 20;
  return (
    <div>
      <Helmet>
        <title>Blog || Manage Blog Posts</title>
      </Helmet>
      <AdminSubTitle subTitle="Manage Blog Posts" dataLength={len} />
      <div className="p-2">
        {hasPermission("create-post") && (
          <button className="btn btn-primary">OK 1</button>
        )}
        {hasAnyPermission(["create-post", "edit", "read"]) && (
          <button className="btn btn-success ml-10">
            OK Many Permissions Check 2
          </button>
        )}
        {hasAllPermissions(["create-post", "edit", "read", "delete"]) && (
          <button className="btn btn-success ml-10">
            OK All Permissions Check 3
          </button>
        )}
        {hasRole("super-admin") && (
          <button className="btn btn-success ml-10">
            Super Admin Role Check 4
          </button>
        )}
        {hasAnyRole(["super-admin", "admin"]) && (
          <button className="btn btn-success ml-10">
            Super Admin Has Any Role Check 5
          </button>
        )}
        {hasAllRoles(["super-admin", "admin", "editor", "writer"]) && (
          <button className="btn btn-warning ml-10">
            Super Admin Has All Role Check 6
          </button>
        )}
        Manage Blog Posts
      </div>
    </div>
  );
};

export default ManageBlogPosts;
