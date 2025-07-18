import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import NavigationBar from "./app/components/navigation-bar/NavigationBar";
import Footer from "./app/components/footer/Footer";

import { AppWrapper } from "./app/main/AppWrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="max-h-screen flex flex-col">
        <NavigationBar />
        <AppWrapper />
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
