import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Reservations from "./Reservations";
import { EventDetails, Purchase } from "../../../types/types";
import { eventdetails, purchase } from "../../../../../testSetup/mockdata";

const mockEvent: EventDetails = eventdetails;
const mockPurchase: Purchase = purchase;

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithRouterAndQuery = (
  ui: React.ReactNode,
  route = "/?eventId=event-1"
) => {
  const client = createQueryClient();
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </MemoryRouter>
  );
};

describe("Reservations component", () => {
  it("renders loading state", async () => {
    const fetchMock = vi.fn(() => new Promise(() => {})); // never resolves
    const postMock = vi.fn();

    renderWithRouterAndQuery(
      <Reservations
        fetchEventsDetails={fetchMock}
        postReservations={postMock}
      />
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("fetch failed error state", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Failed to fetch"));
    const postMock = vi.fn();

    renderWithRouterAndQuery(
      <Reservations
        fetchEventsDetails={fetchMock}
        postReservations={postMock}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });
  });

  it("renders ReservationFormWrapper on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockEvent);
    const postMock = vi.fn();

    renderWithRouterAndQuery(
      <Reservations
        fetchEventsDetails={fetchMock}
        postReservations={postMock}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText(`${eventdetails.description}`)
      ).toBeInTheDocument();
    });
  });
});
