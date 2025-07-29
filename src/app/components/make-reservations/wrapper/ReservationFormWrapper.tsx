import { useState } from "react";

import { EventDetails, NewReservation } from "../../../types/types";
import EventInfo from "../../event-info/EventInfo";
import ReservationsSummary from "../summary/ReservationsSummary";
import ReservationsSelector from "../selector/ReservationsSelector";

interface Props {
  eventDetails: EventDetails;
  submitReservations: (reservations: NewReservation[]) => void;
}

const ReservationFormWrapper = ({
  eventDetails,
  submitReservations,
}: Props) => {
  const [reservations, setReservations] = useState<NewReservation[]>([]);

  const addReservation = (newRes: NewReservation) => {
    setReservations((prev) => [...prev, newRes]);
  };

  const removeReservation = (index: number) => {
    setReservations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-brand-white">
      <EventInfo eventDetails={eventDetails} />

      <div className="mt-6" data-testid="reservations-selector">
        <ReservationsSelector
          eventDetails={eventDetails}
          addReservation={addReservation}
        />
      </div>

      <div className="mt-6" data-testid="reservations-summary">
        <ReservationsSummary
          reservations={reservations}
          eventDetails={eventDetails}
          submitReservations={submitReservations}
          removeReservation={removeReservation}
        />
      </div>
    </div>
  );
};

export default ReservationFormWrapper;
