import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/main/App";
import { AuthProvider } from "./app/auth/AuthProvider";
import "./index.css";
import NavigationBar from "./app/components/navigation-bar/NavigationBar";
import Footer from "./app/components/footer/Footer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <div className="max-h-screen flex flex-col">
          <NavigationBar />
          <App />
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
