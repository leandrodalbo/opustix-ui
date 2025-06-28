import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { AuthProvider } from "./auth/AuthProvider";
import "./index.css";
import NavigationBar from "./app/components/navigation-bar/NavigationBar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <div className="max-h-screen flex flex-col">
          <NavigationBar />
          <App />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
