import { useLocation, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { AuthProvider } from "../auth/AuthProvider";
import Callback from "../pages/callback/Callback";

const queryClient = new QueryClient();

export const AppWrapper = () => {
  const location = useLocation();

  if (location.pathname === "/callback") {
    return (
      <Routes>
        <Route path="/callback" element={<Callback />} />
      </Routes>
    );
  }

  return (
    <div className="max-h-screen flex flex-col">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
};
