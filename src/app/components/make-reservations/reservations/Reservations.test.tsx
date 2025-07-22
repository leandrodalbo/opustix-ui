import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Reservations from "./Reservations";
import type {
  EventDetails,
  NewReservation,
  Purchase,
} from "../../../types/types";

vi.mock("../reservations-modal/ReservationsModal", () => ({
  default: ({ isOpen, onClose, onSave }: any) => {
    return isOpen ? (
      <div data-testid="mock-modal">
        <button onClick={() => onSave(mockReservation)}>Mock Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null;
  },
}));

const mockEventDetails: EventDetails = {
  id: "d5a1b3f0-1a4e-4bfa-a8b2-1234567890ab",
  title: "Jazz Night 2025",
  description:
    "An unforgettable night of live jazz performances featuring international artists.",
  startTime: 1753123200000,
  endTime: 1753130400000,
  capacity: 500,
  venueDto: {
    id: "3e82b573-8c2d-4d5a-9eae-12abcde34567",
    name: "Grand Music Hall",
    address: "123 Symphony Avenue",
    city: "New York",
    country: "USA",
  },
  ticketTypes: [
    {
      id: "t1",
      name: "General Admission",
      price: 49.99,
      currency: "USD",
      saleStart: 1750531200000,
      saleEnd: 1753046400000,
      description: "Access to all main stage performances.",
    },
  ],
  sectors: [
    {
      id: "s1",
      name: "Front Row",
      description: "Closest to the stage with premium view.",
      priceAddition: 30,
    },
  ],
  seats: [
    {
      id: "seat1",
      label: "A1",
      seatRowInfo: "A",
      seatNumber: "1",
      priceAddition: 5,
    },
  ],
};

const mockReservation: NewReservation = {
  ticketTypeId: "t1",
  sectorId: "s1",
  seatId: "seat1",
};

const mockPurchase: Purchase = {
  confirmationId: "abc123",
  status: "confirmed",
};

let fetchEventsDetails: any;
let postReservations: any;

const renderComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <MemoryRouter
      initialEntries={[
        "/reservations?eventId=d5a1b3f0-1a4e-4bfa-a8b2-1234567890ab",
      ]}
    >
      <QueryClientProvider client={queryClient}>
        <Reservations
          fetchEventsDetails={fetchEventsDetails}
          postReservations={postReservations}
        />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("Reservations Component", () => {
  beforeEach(() => {
    fetchEventsDetails = vi.fn().mockResolvedValue(mockEventDetails);
    postReservations = vi.fn().mockResolvedValue(mockPurchase);
  });

  it("renders loading state", async () => {
    fetchEventsDetails = vi.fn(() => new Promise(() => {}));
    renderComponent();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("renders event details", async () => {
    renderComponent();
    await screen.findByText(/Jazz Night 2025/);
    expect(screen.getByText(/Grand Music Hall/)).toBeInTheDocument();
    expect(screen.getByText(/Agregar Reserva/)).toBeInTheDocument();
  });

  it("opens and saves reservation using modal", async () => {
    renderComponent();
    await screen.findByText(/Agregar Reserva/);

    fireEvent.click(screen.getByText("Agregar Reserva"));
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Mock Save"));
    expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();

    expect(screen.getByText(/General Admission/)).toBeInTheDocument();
    expect(screen.getByText(/Front Row/)).toBeInTheDocument();
    expect(screen.getByText(/A1/)).toBeInTheDocument();
  });

  it("edits and deletes reservations", async () => {
    renderComponent();
    await screen.findByText("Agregar Reserva");
    fireEvent.click(screen.getByText("Agregar Reserva"));
    fireEvent.click(screen.getByText("Mock Save"));

    fireEvent.click(screen.getByText("Editar"));
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Eliminar"));
    expect(screen.queryByText("General Admission")).not.toBeInTheDocument();
  });

  it("submits reservations", async () => {
    renderComponent();
    await screen.findByText("Agregar Reserva");
    fireEvent.click(screen.getByText("Agregar Reserva"));
    fireEvent.click(screen.getByText("Mock Save"));

    fireEvent.click(screen.getByText("Confirmar Reservas"));

    await waitFor(() => {
      expect(postReservations).toHaveBeenCalledWith([mockReservation]);
    });
  });
});
