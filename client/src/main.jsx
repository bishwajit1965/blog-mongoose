import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import PublicDataProvider from "./providers/PublicDataProvider.jsx";
import AuthPublicUsersProvider from "./providers/AuthPublicUsersProvider.jsx";
import SystemSettingsContextProvider from "./providers/SystemSettingsContextProvider.jsx";
import { StrictMode } from "react";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <PublicDataProvider>
            <SystemSettingsContextProvider>
              <AuthPublicUsersProvider>
                <AuthProvider>
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
                </AuthProvider>
              </AuthPublicUsersProvider>
            </SystemSettingsContextProvider>
          </PublicDataProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
);
