import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import EventsPage from "../pages/events/EventsPage";
import Profile from "../pages/profile/Profile";
import Callback from "../pages/callback/Callback";
import { ExistingUserPage } from "../rbac/ExistingUserPage";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import EventsManagement from "../pages/events-management/EventsManagement";
import { fetchEvents } from "../services/events";

export const App = () => {
  return (
    <div className="flex-grow overflow-auto px-8 pb-4">
      <Routes>
        <Route path="/" element={<Home fetchEvents={fetchEvents} />} />
        <Route
          path="/events"
          element={<EventsPage fetchEvents={fetchEvents} />}
        />
        <Route path="/login" element={<Profile />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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
