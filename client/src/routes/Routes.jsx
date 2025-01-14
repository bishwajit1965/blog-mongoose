import AboutMe from "../pages/aboutMe/AboutMe";
import AdminDashboard from "../admin/adminDashboard/AdminDashboard";
import AdminDashboardHome from "../admin/adminDashboardHome/AdminDashboardHome";
import AdminLayout from "../admin/adminLayout/adminLayout";
import AdminLogin from "../admin/adminPages/AdminLogin";
import BlogPosts from "../pages/blogPosts/BlogPosts";
import ContactMe from "../pages/contactMe/ContactMe";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import LoginLayout from "../layouts/loginLayout/LoginLayout";
import ManageBlogPosts from "../admin/adminDataManagement/manageBlogPosts/ManageBlogPosts";
import ManageCategories from "../admin/adminDataManagement/manageCategories/ManageCategories";
import ManageTags from "../admin/adminDataManagement/manageTags/ManageTags";
import ManageUsers from "../admin/adminDataManagement/manageUsers/ManageUsers";
import Register from "../pages/register/Register";
import RootLayout from "../layouts/rootLayout/RootLayout";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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
        element: <ContactMe />,
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
  // Admin protected routes
  {
    path: "/admin",
    element: <AdminLayout />,

    children: [
      {
        path: "admin-home-dashboard",
        element: <AdminDashboardHome />,
      },
      {
        path: "dashboard",
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
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
