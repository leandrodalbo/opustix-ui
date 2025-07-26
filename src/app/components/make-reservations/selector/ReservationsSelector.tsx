import { useMemo, useState } from "react";
import { EventDetails, NewReservation } from "../../../types/types";

interface ReservationsSelectorProps {
  eventDetails: EventDetails;
  addReservation: (res: NewReservation) => void;
}

const ReservationsSelector = ({
  eventDetails,
  addReservation,
}: ReservationsSelectorProps) => {
  const [ticketTypeId, setTicketTypeId] = useState<string>("");
  const [sectorId, setSectorId] = useState<string>("");
  const [seatId, setSeatId] = useState<string>("");

  const [sectorError, setSectorError] = useState<string | null>(null);
  const [seatError, setSeatError] = useState<string | null>(null);
  const [ticketTypeError, setTicketTypeError] = useState<string | null>(null);

  const filteredSectors = useMemo(
    () =>
      eventDetails.sectors.filter(
        (sector) => sector.ticketTypeId === ticketTypeId
      ),
    [ticketTypeId, eventDetails.sectors]
  );

  const filteredSeats = useMemo(
    () => eventDetails.seats.filter((seat) => seat.sectorId === sectorId),
    [sectorId, eventDetails.seats]
  );

  const handleAdd = () => {
    if (!ticketTypeId) {
      setTicketTypeError("Debe seleccionar un tipo de ticket.");
      return;
    }

    if (filteredSectors.length > 0 && !sectorId) {
      setSectorError("Debe seleccionar un sector.");
      return;
    }

    if (filteredSeats.length > 0 && !seatId) {
      setSeatError("Debe seleccionar un asiento.");
      return;
    }

    addReservation({
      eventId: eventDetails.id,
      ticketTypeId,
      sectorId: sectorId || null,
      seatId: seatId || null,
    });

    setSectorId("");
    setSeatId("");
    setSectorError(null);
    setSeatError(null);
    setTicketTypeId("");
    setTicketTypeError(null);
  };

  return (
    <div className="bg-darkBg p-4 rounded-xl space-y-4">
      <div>
        <label className="block text-white mb-1">Ticket</label>
        <select
          value={ticketTypeId}
          onChange={(e) => {
            setTicketTypeId(e.target.value);
            setSectorId("");
            setSeatId("");
            setTicketTypeError(null);
            setSectorError(null);
            setSeatError(null);
          }}
          className="w-full rounded-lg p-2 bg-lightBg text-black"
          data-testid="ticket-select"
        >
          <option value="">Elige un ticket</option>
          {eventDetails.ticketTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} - {t.price.toFixed(2)} {t.currency}
            </option>
          ))}
        </select>
        {ticketTypeError && (
          <p className="text-red-500 text-sm mt-1">{ticketTypeError}</p>
        )}
      </div>

      {filteredSectors.length > 0 && (
        <div>
          <label className="block text-white mb-1">Sector</label>
          <select
            value={sectorId}
            onChange={(e) => {
              setSectorId(e.target.value);
              setSeatId("");
              setTicketTypeError(null);
              setSectorError(null);
              setSeatError(null);
            }}
            className="w-full rounded-lg p-2 bg-lightBg text-black"
            data-testid="sector-select"
          >
            <option value="">Elige un Sector</option>
            {filteredSectors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {sectorError && (
            <p className="text-red-500 text-sm mt-1">{sectorError}</p>
          )}
        </div>
      )}

      {filteredSeats.length > 0 && (
        <div>
          <label className="block text-white mb-1">Asiento</label>
          <select
            value={seatId}
            onChange={(e) => {
              setSeatId(e.target.value);
              setTicketTypeError(null);
              setSectorError(null);
              setSeatError(null);
            }}
            className="w-full rounded-lg p-2 bg-lightBg text-black"
            data-testid="seats-select"
          >
            <option value="">Elige un Asiento</option>
            {filteredSeats.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label} ({s.seatNumber})
              </option>
            ))}
          </select>
          {seatError && (
            <p className="text-red-500 text-sm mt-1">{seatError}</p>
          )}
        </div>
      )}

      <button
        className="w-full mt-2 bg-secondary hover:bg-secondary-hover text-black"
        onClick={handleAdd}
        data-testid="add-reservations"
      >
        Agregar Reserva
      </button>
    </div>
  );
};

export default ReservationsSelector;
