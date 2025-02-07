import "./index.css";

import { Bounce, ToastContainer } from "react-toastify";

import CombinedProviders from "./providers/combinedProviders.jsx";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CombinedProviders>
      <HelmetProvider>
        <ThemeProvider>
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
    </CombinedProviders>
  </StrictMode>
);
