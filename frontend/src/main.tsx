import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./CartContext.tsx";
import { AuthProvider } from "./AuthContext";
import { DarkModeProvider } from "./DarkModeContext";

createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <AuthProvider>
      <ContextProvider>
        <DarkModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DarkModeProvider>
      </ContextProvider>
    </AuthProvider>
  </StrictMode>,
);
