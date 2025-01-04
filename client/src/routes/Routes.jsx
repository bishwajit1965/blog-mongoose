import AdminDashboard from "../admin/adminDashboard/adminDashboard";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import AdminLogin from "../admin/adminPages/AdminLogin";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import LoginLayout from "../layouts/loginLayout/LoginLayout";
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
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

export default router;
