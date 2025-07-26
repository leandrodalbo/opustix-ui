import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EventDetails, NewReservation, Purchase } from "../../../types/types";

import AboutFetch from "../../about-fetch/AboutFetch";
import ReservationFormWrapper from "../wrapper/ReservationFormWrapper";

interface ReservationsProps {
  fetchEventsDetails: (eventId: string) => Promise<EventDetails>;
  postReservations: (reservations: NewReservation[]) => Promise<Purchase>;
}

const Reservations = ({
  fetchEventsDetails,
  postReservations,
}: ReservationsProps) => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEventsDetails(eventId!),
    enabled: !!eventId,
  });

  const eventDetails = event as EventDetails;

  const submitReservations = (reservations: NewReservation[]) => {
    postReservations(reservations).then((it) => console.log(it));
  };

  if (isLoading || error) {
    return (
      <AboutFetch
        isLoading={isLoading}
        error={
          error ||
          new Error("Ocurrió un error al obtener los detalles del evento.")
        }
      />
    );
  }

  return (
    <ReservationFormWrapper
      eventDetails={eventDetails}
      submitReservations={submitReservations}
    />
  );
};

export default Reservations;
