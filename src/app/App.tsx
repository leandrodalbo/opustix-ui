import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Events from "../pages/events/Events";
import Profile from "../pages/profile/Profile";
import Callback from "../pages/callback/Callback";
import { ExistingUserPage } from "../rbac/ExistingUserPage";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import EventsManagement from "../pages/events-management/EventsManagement";
import Cartelera from "../pages/cartelera/Cartelera";

export const App = () => {
  return (
    <div className="flex-grow overflow-auto px-8 pb-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cartelera" element={<Cartelera />} />
        <Route path="/login" element={<Profile />} />
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
    </div>
  );
};
