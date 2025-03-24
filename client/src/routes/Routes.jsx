import AboutMe from "../pages/aboutMe/AboutMe";
import AdminDashboard from "../admin/adminComponent/adminDashboard/AdminDashboard";
import AdminLayout from "../admin/adminLayout/adminLayout";
import AdminLogin from "../admin/adminPages/AdminLogin";
import ArchivedBlogPosts from "../admin/adminDataManagement/manageBlogPosts/ArchivedBlogPosts";
import BlogPosts from "../pages/blogPosts/BlogPosts";
import ComingSoonPosts from "../admin/adminDataManagement/manageBlogPosts/ComingSoonPosts";
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
import ProfileManagement from "../admin/adminDataManagement/profileManagement/ProfileManagement";
import Register from "../pages/register/Register";
import RequireAdmin from "../admin/requireAdmin/RequireAdmin";
import RoleForm from "../admin/adminDataManagement/manageRoles/RoleForm";
import RootLayout from "../layouts/rootLayout/RootLayout";
import ScheduledPosts from "../admin/adminDataManagement/manageBlogPosts/ScheduledPosts";
import SuperAdminDashboard from "../admin/adminComponent/superAdminDashboard/SuperAdminDashboard";
import SuperAdminLayout from "../admin/adminLayout/SuperAdminLayout";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import Unauthorized from "../admin/unauthorized/Unauthorized";
import WriterDashboard from "../admin/adminComponent/writerDashboard/WriterDashboard";
import WriterLayout from "../admin/adminLayout/WriterLayout";
import { createBrowserRouter } from "react-router-dom";

// Common Admin Routes (Super Admin can access all)
const superAdminRoutes = [
  { path: "super-admin-dashboard", element: <SuperAdminDashboard /> },
  { path: "manage-blogs", element: <ManageBlogPosts /> },
  { path: "archived-blogs", element: <ArchivedBlogPosts /> },
  { path: "coming-soon", element: <ComingSoonPosts /> },
  { path: "scheduled-posts", element: <ScheduledPosts /> },
  { path: "manage-categories", element: <ManageCategories /> },
  { path: "manage-tags", element: <ManageTags /> },
  { path: "manage-users", element: <ManageUsers /> },
  { path: "manage-roles", element: <ManageRoles /> },
  { path: "role-form", element: <RoleForm /> },
  { path: "manage-permissions", element: <ManagePermissions /> },
  {
    path: "assign-roles-permissions",
    element: <ManageUsersRolesAndPermissions />,
  },
  { path: "manage-profile", element: <ProfileManagement /> },
];

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about-me", element: <AboutMe /> },
      {
        path: "contact-me",
        element: (
          <PrivateRoute>
            <ContactMe />
          </PrivateRoute>
        ),
      },
      { path: "blog-posts", element: <BlogPosts /> },
    ],
  },

  // Login & Register Routes
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "terms-conditions", element: <TermsConditions /> },
    ],
  },

  // Unauthorized Page
  { path: "/unauthorized", element: <Unauthorized /> },

  // Admin Login
  { path: "/admin/login", element: <AdminLogin /> },

  // Super Admin Routes (Full Access)
  {
    path: "/super-admin/*",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["super-admin"]}>
        <SuperAdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      ...superAdminRoutes,
    ],
  },

  // Admin Routes (Limited Access)
  {
    path: "/admin/*",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["admin", "super-admin"]}>
        <AdminLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "admin-dashboard", element: <AdminDashboard /> },
      { path: "manage-blogs", element: <ManageBlogPosts /> },
      { path: "manage-categories", element: <ManageCategories /> },
      { path: "manage-tags", element: <ManageTags /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "*", element: <Unauthorized /> },
    ],
  },

  // Editor Routes
  {
    path: "/editor/*",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["editor"]}>
        <EditorLayout />
      </RequireAdmin>
    ),
    children: [
      { index: true, element: <EditorDashboard /> },
      { path: "manage-blogs", element: <ManageBlogPosts /> },
    ],
  },

  // Writer Routes
  {
    path: "/writer/*",
    errorElement: <ErrorPage />,
    element: (
      <RequireAdmin allowedRoles={["writer"]}>
        <WriterLayout />
      </RequireAdmin>
    ),
    children: [{ index: true, element: <WriterDashboard /> }],
  },
]);

export default router;
