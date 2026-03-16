import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import PublicDataProvider from "./providers/PublicDataProvider.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <PublicDataProvider>
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
          </PublicDataProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
);
