import { useState, useEffect } from "react";
import { NewReservation, EventDetails, EventSeat } from "../../../types/types";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reservation: NewReservation) => void;
  event: EventDetails;
  initialData?: NewReservation;
}

const ReservationModal = ({
  isOpen,
  onClose,
  onSave,
  event,
  initialData,
}: ReservationModalProps) => {
  const [form, setForm] = useState<NewReservation>({
    eventId: event.id,
    ticketTypeId: "",
    sectorId: undefined,
    seatId: undefined,
  });

  useEffect(() => {
    setForm(
      initialData ?? {
        eventId: event.id,
        ticketTypeId: event.ticketTypes[0]?.id || "",
        sectorId: undefined,
        seatId: undefined,
      }
    );
  }, [initialData, event]);

  const handleChange = (updates: Partial<NewReservation>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const filteredSeats =
    event.sectors.length === 0
      ? event.seats
      : form.sectorId
      ? event.seats.filter(
          (seat: EventSeat) => seat.sector?.id === form.sectorId
        )
      : event.seats.filter((seat: EventSeat) => !seat.sector);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-darkBg text-darkText p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2 className="text-2xl font-semibold mb-6">Reserva</h2>

        <div className="mb-5">
          <label className="block mb-1 font-medium">Ticket</label>
          <select
            className="w-full bg-darkText text-darkerText rounded border border-secondary-border p-3 focus:outline-none focus:ring-2 focus:ring-secondary-hover"
            value={form.ticketTypeId}
            onChange={(e) => handleChange({ ticketTypeId: e.target.value })}
          >
            {event.ticketTypes.map((it) => (
              <option key={it.id} value={it.id}>
                {it.name} – {it.price} {it.currency}
              </option>
            ))}
          </select>
        </div>

        {event.sectors.length > 0 && (
          <div className="mb-5">
            <label className="block mb-1 font-medium">Sector</label>
            <select
              className="w-full bg-darkText text-darkerText rounded border border-secondary-border p-3 focus:outline-none focus:ring-2 focus:ring-secondary-hover"
              value={form.sectorId || ""}
              onChange={(e) =>
                handleChange({
                  sectorId: e.target.value || undefined,
                  seatId: undefined,
                })
              }
            >
              <option value="">-- No sector --</option>
              {event.sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {filteredSeats.length > 0 && (
          <div className="mb-6">
            <label className="block mb-1 font-medium">Asiento</label>
            <select
              className="w-full bg-darkText text-darkerText rounded border border-secondary-border p-3 focus:outline-none focus:ring-2 focus:ring-secondary-hover"
              value={form.seatId || ""}
              onChange={(e) =>
                handleChange({ seatId: e.target.value || undefined })
              }
            >
              <option value="">-- No seat --</option>
              {filteredSeats.map((seat) => {
                const sectorName = event.sectors.find(
                  (sector) => sector.id === seat.sector?.id
                )?.name;
                return (
                  <option key={seat.id} value={seat.id}>
                    {seat.label}
                    {sectorName ? ` (Sector: ${sectorName})` : ""}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-secondary hover:bg-secondary-hover text-secondary-dark transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 rounded bg-darkText text-darkerText hover:bg-[#d0d0d0] font-semibold transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
