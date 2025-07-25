import { EventDetails, NewReservation, TicketType } from "../../../types/types";

interface ReservationProps {
  reservations: NewReservation[];
  eventDetails: EventDetails;
  submitReservations: (reservations: NewReservation[]) => void;
  removeReservation: (index: number) => void;
}

const ReservationsSummary = ({
  reservations,
  eventDetails,
  submitReservations,
  removeReservation,
}: ReservationProps) => {
  const getTicket = (ticketTypeId: string) =>
    eventDetails.ticketTypes.find(
      (ticketType: TicketType) => ticketType.id === ticketTypeId
    );

  const total = reservations.reduce(
    (sum, res) => sum + (getTicket(res.ticketTypeId)?.price ?? 0),
    0
  );

  return (
    <div className="bg-darkBg rounded-xl p-4 text-white">
      <h3 className="text-lg font-semibold mb-4">Reservas a Confirmar</h3>
      <ul className="space-y-3">
        {reservations.map((res, index) => {
          const ticket = getTicket(res.ticketTypeId);
          const sector = eventDetails.sectors.find(
            (s) => s.id === res.sectorId
          );
          const seat = eventDetails.seats.find((s) => s.id === res.seatId);

          return (
            <li
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between bg-lightBg p-3 rounded-lg text-black"
            >
              <div className="space-y-1">
                <p className="font-medium" data-testid="reservation-ticket">
                  <b>Ticket:</b> {ticket?.name} - ${ticket?.price.toFixed(2)}
                </p>
                {sector?.name && (
                  <p data-testid={`reservation-sector-${sector.id}`}>
                    <b>Sector:</b> {sector.name}
                  </p>
                )}
                {seat?.label && (
                  <p data-testid={`reservation-sector-${seat.id}`}>
                    <b>Asiento:</b> {seat.label}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeReservation(index)}
                className="mt-2 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Eliminar
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 font-bold text-lg">Total: ${total.toFixed(2)}</p>
      <button
        className="w-full mt-4 bg-secondary hover:bg-secondary-hover text-black p-2 rounded-md"
        onClick={() => submitReservations(reservations)}
      >
        Confirmar Reservas
      </button>
    </div>
  );
};

export default ReservationsSummary;
