import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReservationsSummary from "./ReservationsSummary";
import { EventDetails, NewReservation } from "../../../types/types";
import { eventdetails } from "../../../../../testSetup/mockdata";

const mockEventDetails: EventDetails = eventdetails;
const mockReservations: NewReservation[] = [
  {
    eventId: eventdetails.id,
    ticketTypeId: "fsdv345g-6789-0abc-def1-234567890abc",
    sectorId: "agfsrhg-1234-5678-90ab-cdef12345678",
    seatId: "fjk4wer-5678-90ab-cdef-1234567890gh",
  },
];

describe("ReservationsSummary", () => {
  it("renders all reservation items with correct details", () => {
    const mockSubmit = vi.fn();
    const mockRemove = vi.fn();

    render(
      <ReservationsSummary
        eventDetails={mockEventDetails}
        reservations={mockReservations}
        submitReservations={mockSubmit}
        removeReservation={mockRemove}
      />
    );

    expect(screen.getByTestId("reservation-ticket")).toBeInTheDocument();
    expect(
      screen.getByTestId(`reservation-sector-${mockReservations[0].sectorId}`)
    ).toBeInTheDocument();
  });

  it("calls removeReservation with correct index", () => {
    const mockSubmit = vi.fn();
    const mockRemove = vi.fn();

    render(
      <ReservationsSummary
        eventDetails={mockEventDetails}
        reservations={mockReservations}
        submitReservations={mockSubmit}
        removeReservation={mockRemove}
      />
    );

    const removeButtons = screen.getAllByRole("button", { name: /eliminar/i });

    fireEvent.click(removeButtons[0]);
    expect(mockRemove).toHaveBeenCalledTimes(1);
  });

  it("calls submitReservations on confirm", () => {
    const mockSubmit = vi.fn();
    const mockRemove = vi.fn();

    render(
      <ReservationsSummary
        eventDetails={mockEventDetails}
        reservations={mockReservations}
        submitReservations={mockSubmit}
        removeReservation={mockRemove}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /confirmar reservas/i })
    );
    expect(mockSubmit).toHaveBeenCalledWith(mockReservations);
  });
});
