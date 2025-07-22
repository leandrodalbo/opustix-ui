import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EventDetails, NewReservation, Purchase } from "../../../types/types";
import ReservationModal from "../reservations-modal/ReservationsModal";
import AboutFetch from "../../about-fetch/AboutFetch";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
  const [reservations, setReservations] = useState<NewReservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const submitReservations = () => {
    postReservations(reservations).then((it) => console.log(it));
  };

  const handleSave = (reservation: NewReservation) => {
    setReservations((prev) => {
      const updated = [...prev];
      if (editingIndex !== null) {
        updated[editingIndex] = reservation;
      } else {
        updated.push(reservation);
      }
      return updated;
    });
    setIsModalOpen(false);
    setEditingIndex(null);
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
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-darkBg text-darkText min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">
          Reservar Tickets – {eventDetails.title}
        </h1>
        <button
          className="px-5 py-2 rounded bg-white text-darkBg transition-colors font-semibold"
          onClick={() => {
            setEditingIndex(null);
            setIsModalOpen(true);
          }}
        >
          Agregar Reserva
        </button>
      </div>

      <section className="bg-lighterBg text-lightText rounded-lg shadow-sm p-5 mb-8 space-y-2 text-sm sm:text-base">
        <p>{eventDetails.description}</p>
        <p>
          <strong>Fecha:</strong>{" "}
          {format(new Date(eventDetails.startTime), "PPP", { locale: es })}
        </p>
        <p>
          <strong>Hora:</strong>{" "}
          {format(new Date(eventDetails.startTime), "p", { locale: es })} –{" "}
          {format(new Date(eventDetails.endTime), "p", { locale: es })}
        </p>
        <p>
          <strong>Ubicación:</strong> {eventDetails.venueDto.name},{" "}
          {eventDetails.venueDto.address}, {eventDetails.venueDto.city},{" "}
          {eventDetails.venueDto.country}
        </p>
      </section>

      <ul className="space-y-4">
        {reservations.map((r, idx) => {
          const ticket = eventDetails.ticketTypes.find(
            (t) => t.id === r.ticketTypeId
          );
          const sector = eventDetails.sectors.find((s) => s.id === r.sectorId);
          const seat = eventDetails.seats.find((s) => s.id === r.seatId);

          return (
            <li
              key={idx}
              className="bg-lighterBg text-lightText border border-secondary-border rounded px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="space-y-1 text-sm sm:text-base">
                <p>
                  <strong>Ticket:</strong> {ticket?.name || "Desconocido"}
                </p>
                {sector && (
                  <p>
                    <strong>Sector:</strong> {sector.name}
                  </p>
                )}
                {seat && (
                  <p>
                    <strong>Asiento:</strong> {seat.label}
                  </p>
                )}
              </div>
              <div className="mt-3 sm:mt-0 flex gap-2">
                <button
                  className="px-4 py-1.5 text-sm rounded bg-secondary-dark text-darkText transition-colors"
                  onClick={() => {
                    setEditingIndex(idx);
                    setIsModalOpen(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="px-4 py-1.5 text-sm rounded bg-red-700 text-white transition-colors"
                  onClick={() => {
                    setReservations((prev) => prev.filter((_, i) => i !== idx));
                  }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {reservations.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={submitReservations}
            className="px-8 py-3 rounded bg-white text-darkBg font-semibold transition-colors"
          >
            Confirmar Reservas
          </button>
        </div>
      )}

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        event={eventDetails}
        onSave={handleSave}
        initialData={
          editingIndex !== null ? reservations[editingIndex] : undefined
        }
      />
    </div>
  );
};

export default Reservations;
