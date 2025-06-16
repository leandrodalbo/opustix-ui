import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Events from "../pages/events/Events";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
