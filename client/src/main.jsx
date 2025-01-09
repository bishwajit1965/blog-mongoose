import "./index.css";

import AdminAuthProvider from "./admin/adminAuthProvider/AdminAuthProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <HelmetProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </HelmetProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>
);
