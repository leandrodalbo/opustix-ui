import { render, screen, fireEvent } from "@testing-library/react";
import ReservationModal from "./ReservationsModal";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EventDetails } from "../../../types/types";
import { eventdetails } from "../../../../../testSetup/mockdata";

const mockEvent: EventDetails = eventdetails;

describe("ReservationModal", () => {
  const onClose = vi.fn();
  const onSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <ReservationModal
        isOpen={false}
        onClose={onClose}
        onSave={onSave}
        event={mockEvent}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders correctly when open", () => {
    render(
      <ReservationModal
        isOpen={true}
        onClose={onClose}
        onSave={onSave}
        event={mockEvent}
      />
    );

    expect(screen.getByText("Reserva")).toBeInTheDocument();
    expect(screen.getByLabelText("Ticket")).toBeInTheDocument();
    expect(screen.getByLabelText("Sector")).toBeInTheDocument();
    expect(screen.getByLabelText("Asiento")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(
      <ReservationModal
        isOpen={true}
        onClose={onClose}
        onSave={onSave}
        event={mockEvent}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onSave with the correct data", () => {
    render(
      <ReservationModal
        isOpen={true}
        onClose={onClose}
        onSave={onSave}
        event={mockEvent}
      />
    );

    fireEvent.change(screen.getByLabelText("Ticket"), {
      target: { value: mockEvent.ticketTypes[1].id },
    });

    fireEvent.change(screen.getByLabelText("Sector"), {
      target: { value: mockEvent.sectors[1].id },
    });

    fireEvent.change(screen.getByLabelText("Asiento"), {
      target: { value: mockEvent.seats[1].id },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(onSave).toHaveBeenCalledWith({
      eventId: mockEvent.id,
      ticketTypeId: mockEvent.ticketTypes[1].id,
      sectorId: mockEvent.sectors[1].id,
      seatId: mockEvent.seats[1].id,
    });
  });

  it("updates seat list when sector is changed", () => {
    render(
      <ReservationModal
        isOpen={true}
        onClose={onClose}
        onSave={onSave}
        event={mockEvent}
      />
    );

    fireEvent.change(screen.getByLabelText("Sector"), {
      target: { value: mockEvent.sectors[1].id },
    });

    expect(screen.getByText("B2 (Sector: Balcony)")).toBeInTheDocument();
    expect(screen.queryByText("A1")).not.toBeInTheDocument();
  });
});
