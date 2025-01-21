import "./index.css";

import AdminAuthProvider from "./admin/adminAuthProvider/AdminAuthProvider.jsx";
import AdminPermissionProvider from "./admin/adminProviders/AdminPermissionProvider.jsx";
import AdminRoleProvider from "./admin/adminProviders/AdminRoleProvider.jsx";
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
        <AdminRoleProvider>
          <AdminPermissionProvider>
            <HelmetProvider>
              <ThemeProvider>
                <RouterProvider router={router} />
              </ThemeProvider>
            </HelmetProvider>
          </AdminPermissionProvider>
        </AdminRoleProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>
);
