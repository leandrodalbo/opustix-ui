import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EventDetails, NewReservation, Purchase } from "../../../types/types";

interface ReservationsContainerProps {
  fetchEventsDetails: (eventId: string) => Promise<EventDetails>;
  postReservations: (reservations: NewReservation[]) => Promise<Purchase>;
}

const ReservationsContainer = ({
  fetchEventsDetails,
  postReservations,
}: ReservationsContainerProps) => {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [reservations, setReservations] = useState<NewReservation[]>([]);
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    if (!eventId) return;
    fetchEventsDetails(eventId).then(setEvent);
  }, [eventId]);

  const submitReservations = () => {
    postReservations(reservations);
  };

  if (!event) return <div className="p-6 text-lightText">Loading event...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        + Add Reservation
      </button>

      {reservations.length > 0 && (
        <button
          onClick={submitReservations}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit Reservations
        </button>
      )}
    </div>
  );
};

export default ReservationsContainer;
