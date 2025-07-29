import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import EventsPage from "../pages/events/EventsPage";
import Profile from "../pages/profile/Profile";
import { ExistingUserPage } from "../rbac/ExistingUserPage";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import EventsManagement from "../pages/events-management/EventsManagement";
import { fetchEvents, fetchEventDetails } from "../services/events";
import Contact from "../pages/contact/Contact";
import Reservations from "../components/make-reservations/reservations/Reservations";
import postReservations from "../services/reservations";

export const App = () => {
  return (
    <div className="flex-grow overflow-auto px-12 pb-8">
      <Routes>
        <Route path="/" element={<Home fetchEvents={fetchEvents} />} />

        <Route
          path="/events"
          element={<EventsPage fetchEvents={fetchEvents} />}
        />

        <Route path="/login" element={<Profile />} />

        <Route
          path="/buy"
          element={
            <ExistingUserPage>
              <Reservations
                fetchEventsDetails={fetchEventDetails}
                postReservations={postReservations}
              />
            </ExistingUserPage>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/contacto" element={<Contact />} />

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
