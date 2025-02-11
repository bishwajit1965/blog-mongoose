import AboutMe from "../pages/aboutMe/AboutMe";
import AdminDashboard from "../admin/adminComponent/adminDashboard/AdminDashboard";
import AdminLayout from "../admin/adminLayout/adminLayout";
import AdminLogin from "../admin/adminPages/AdminLogin";
import BlogPosts from "../pages/blogPosts/BlogPosts";
import ContactMe from "../pages/contactMe/ContactMe";
import EditorDashboard from "../admin/adminComponent/editorDashboard/EditorDashboard";
import EditorLayout from "../admin/adminLayout/EditorLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import LoginLayout from "../layouts/loginLayout/LoginLayout";
import ManageBlogPosts from "../admin/adminDataManagement/manageBlogPosts/ManageBlogPosts";
import ManageCategories from "../admin/adminDataManagement/manageCategories/ManageCategories";
import ManagePermissions from "../admin/adminDataManagement/managePermissions/ManagePermissions";
import ManageRoles from "../admin/adminDataManagement/manageRoles/ManageRoles";
import ManageTags from "../admin/adminDataManagement/manageTags/ManageTags";
import ManageUsers from "../admin/adminDataManagement/manageUsers/ManageUsers";
import ManageUsersRolesAndPermissions from "../admin/adminDataManagement/manageUsersRolesAndPermissions/ManageUsersRolesAndPermissions";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Register from "../pages/register/Register";
import RequireAdmin from "../admin/requireAdmin/RequireAdmin";
import RoleForm from "../admin/adminDataManagement/manageRoles/RoleForm";
import RootLayout from "../layouts/rootLayout/RootLayout";
import SuperAdminDashboard from "../admin/adminComponent/superAdminDashboard/SuperAdminDashboard";
import SuperAdminLayout from "../admin/adminLayout/SuperAdminLayout";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import Unauthorized from "../admin/unauthorized/Unauthorized";
import WriterDashboard from "../admin/adminComponent/writerDashboard/WriterDashboard";
import WriterLayout from "../admin/adminLayout/WriterLayout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-me",
        element: <AboutMe />,
      },
      {
        path: "/contact-me",
        element: (
          <PrivateRoute>
            <ContactMe />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog-posts",
        element: <BlogPosts />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  // Frontend user login layout & routs
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },
    ],
  },
  // Admin login route
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  // Super-admin protected routes
  {
    path: "/super-admin",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["super-admin", "admin"]}>
        <SuperAdminLayout />,
      </RequireAdmin>
    ),
    children: [
      {
        path: "super-admin-dashboard",
        element: <SuperAdminDashboard />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlogPosts />,
      },
      {
        path: "manage-categories",
        element: <ManageCategories />,
      },
      {
        path: "manage-tags",
        element: <ManageTags />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-roles",
        element: <ManageRoles />,
      },
      {
        path: "role-form",
        element: <RoleForm />,
      },
      {
        path: "manage-permission",
        element: <ManagePermissions />,
      },
      {
        path: "assign-roles-permissions",
        element: <ManageUsersRolesAndPermissions />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },

  // Admin protected routes
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["super-admin", "admin"]}>
        <AdminLayout />
      </RequireAdmin>
    ),

    children: [
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlogPosts />,
      },
      {
        path: "manage-categories",
        element: <ManageCategories />,
      },
      {
        path: "manage-tags",
        element: <ManageTags />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-roles",
        element: <ManageRoles />,
      },
      {
        path: "role-form",
        element: <RoleForm />,
      },
      {
        path: "manage-permission",
        element: <ManagePermissions />,
      },
      {
        path: "assign-roles-permissions",
        element: <ManageUsersRolesAndPermissions />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },

  // Editor protected routes
  {
    path: "/editor",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["editor"]}>
        <EditorLayout />
      </RequireAdmin>
    ),
    children: [
      {
        path: "editor-dashboard",
        element: <EditorDashboard />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlogPosts />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },

  // Writer protected routes
  {
    path: "/writer",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["writer"]}>
        <WriterLayout />
      </RequireAdmin>
    ),
    children: [
      {
        path: "writer-dashboard",
        element: <WriterDashboard />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
