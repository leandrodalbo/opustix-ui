import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReservationsSelector from "./ReservationsSelector";
import { EventDetails } from "../../../types/types";
import { eventdetails } from "../../../../../testSetup/mockdata";

const mockEventDetails: EventDetails = eventdetails;

describe("ReservationsSelector", () => {
  it("renders ticket select and 'Agregar Reserva' button", () => {
    render(
      <ReservationsSelector
        eventDetails={mockEventDetails}
        addReservation={vi.fn()}
      />
    );

    expect(screen.getByText("Ticket")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar reserva/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when trying to submit empty form", () => {
    render(
      <ReservationsSelector
        eventDetails={mockEventDetails}
        addReservation={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /agregar reserva/i }));

    expect(
      screen.getByText(/Debe seleccionar un tipo de ticket/i)
    ).toBeInTheDocument();
  });

  it("shows sector options after selecting a ticket", () => {
    render(
      <ReservationsSelector
        eventDetails={mockEventDetails}
        addReservation={vi.fn()}
      />
    );

    fireEvent.change(screen.getByTestId("ticket-select"), {
      target: { value: mockEventDetails.ticketTypes[0].id },
    });

    expect(screen.getByText("Elige un Sector")).toBeInTheDocument();
  });

  it("shows seat options after selecting a sector", () => {
    render(
      <ReservationsSelector
        eventDetails={mockEventDetails}
        addReservation={vi.fn()}
      />
    );

    fireEvent.change(screen.getByTestId("ticket-select"), {
      target: { value: mockEventDetails.ticketTypes[0].id },
    });

    fireEvent.change(screen.getByTestId("sector-select"), {
      target: { value: mockEventDetails.sectors[0].id },
    });

    expect(screen.getByText("Asiento")).toBeInTheDocument();
  });

  it("calls addReservation with correct data", () => {
    const mockAddReservation = vi.fn();

    render(
      <ReservationsSelector
        eventDetails={mockEventDetails}
        addReservation={mockAddReservation}
      />
    );

    fireEvent.change(screen.getByTestId("ticket-select"), {
      target: { value: "fsdv345g-6789-0abc-def1-234567890abc" },
    });

    fireEvent.change(screen.getByTestId("sector-select"), {
      target: { value: "agfsrhg-1234-5678-90ab-cdef12345678" },
    });

    fireEvent.change(screen.getByTestId("seats-select"), {
      target: { value: "hg8kj4as-1234-5678-90ab-cdef12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Agregar Reserva/i }));

    expect(mockAddReservation).toHaveBeenCalledWith({
      eventId: "aabc1234-5678-90ab-cdef-1234567890ab",
      ticketTypeId: "fsdv345g-6789-0abc-def1-234567890abc",
      sectorId: "agfsrhg-1234-5678-90ab-cdef12345678",
      seatId: "hg8kj4as-1234-5678-90ab-cdef12345678",
    });

    expect(mockAddReservation).toHaveBeenCalledTimes(1);
  });
});
