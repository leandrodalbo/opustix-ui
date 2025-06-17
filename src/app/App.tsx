import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Events from "../pages/events/Events";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Callback from "../pages/callback/Callback";
import { ExistingUserPage } from "../rbac/ExistingUserPage";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import EventsManagement from "../pages/events-management/EventsManagement";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/profile"
        element={
          <ExistingUserPage>
            <Profile />
          </ExistingUserPage>
        }
      />

      <Route
        path="/events/management"
        element={
          <ExistingUserPage roles={["ADMIN", "ORGANIZER"]}>
            <EventsManagement />
          </ExistingUserPage>
        }
      />
    </Routes>
  );
};
