import "./index.css";

import { Bounce, ToastContainer } from "react-toastify";

import AdminAuthProvider from "./admin/adminAuthProvider/AdminAuthProvider.jsx";
import AdminCategoryProvider from "./admin/adminProviders/AdminCategoryProvider.jsx";
import AdminPermissionProvider from "./admin/adminProviders/AdminPermissionProvider.jsx";
import AdminRoleProvider from "./admin/adminProviders/AdminRoleProvider.jsx";
import AdminTagProvider from "./admin/adminProviders/AdminTagProvider.jsx";
import AdminUserProvider from "./admin/adminProviders/AdminUserProvider.jsx";
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
            <AdminCategoryProvider>
              <AdminUserProvider>
                <AdminTagProvider>
                  <HelmetProvider>
                    <ThemeProvider>
                      {/* Add ToastContainer at the top level */}
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Bounce}
                      />
                      <RouterProvider router={router} />
                    </ThemeProvider>
                  </HelmetProvider>
                </AdminTagProvider>
              </AdminUserProvider>
            </AdminCategoryProvider>
          </AdminPermissionProvider>
        </AdminRoleProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>
);
