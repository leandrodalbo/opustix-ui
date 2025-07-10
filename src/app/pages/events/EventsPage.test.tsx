import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EventsPage from "./EventsPage"; // Adjust path
import { vi } from "vitest";
import { events } from "../../../../testSetup/mockdata/mockdata";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const fetchEvents = vi.fn().mockResolvedValue(events);

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
}

vi.mock("../../components/events-filters/EventsFilters", async () => {
  const actual = await vi.importActual(
    "../../components/events-filters/EventsFilters"
  );
  return {
    ...actual,
    EventFilters: ({
      eventTitle,
      setEvenTitle,
      cityFilter,
      setCityFilter,
      categoryFilter,
      setCategoryFilter,
      dateFilter,
      setDateFilter,
      clearFilters,
    }: any) => (
      <div>
        <input
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEvenTitle(e.target.value)}
        />
        <input
          placeholder="Ciudad"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        />
        <input
          placeholder="Categoría"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        <input
          placeholder="Fecha"
          type="date"
          onChange={(e) => setDateFilter(new Date(e.target.value))}
        />
        <button onClick={clearFilters}>Limpiar filtros</button>
      </div>
    ),
  };
});

vi.mock("../../components/events-grid/EventsMaterialGrid", async () => {
  return {
    EventsMaterialGrid: ({ events }: any) => (
      <div>
        {events.map((e: any) => (
          <div key={e.id} data-testid="event-card">
            {e.title}
          </div>
        ))}
      </div>
    ),
  };
});

describe("EventsPage", () => {
  const setup = () => {
    renderWithClient(<EventsPage fetchEvents={fetchEvents} />);
  };

  it("renders all events by default", async () => {
    setup();
    const eventCards = await screen.findAllByTestId("event-card");
    expect(eventCards).toHaveLength(events.length);
  });

  it("filters by title", async () => {
    setup();
    const titleInput = await screen.findByPlaceholderText("Título del evento");

    fireEvent.change(titleInput, { target: { value: events[0].title } });

    await waitFor(() => {
      const filtered = events.filter((e) =>
        e.title.toLowerCase().includes(events[0].title.toLowerCase())
      );
      expect(screen.getAllByTestId("event-card")).toHaveLength(filtered.length);
    });
  });

  it("filters by city", async () => {
    setup();
    const cityInput = await screen.findByPlaceholderText("Ciudad");

    fireEvent.change(cityInput, { target: { value: events[0].venue.city } });

    await waitFor(() => {
      const filtered = events.filter((e) =>
        e.venue.city.toLowerCase().includes(events[0].venue.city.toLowerCase())
      );
      expect(screen.getAllByTestId("event-card")).toHaveLength(filtered.length);
    });
  });

  it("filters by category", async () => {
    setup();
    const categoryInput = await screen.findByPlaceholderText("Categoría");

    fireEvent.change(categoryInput, { target: { value: events[0].category } });

    await waitFor(() => {
      const filtered = events.filter((e) =>
        e.category.toLowerCase().includes(events[0].category.toLowerCase())
      );
      expect(screen.getAllByTestId("event-card")).toHaveLength(filtered.length);
    });
  });

  it("clears filters", async () => {
    setup();

    const titleInput = await screen.findByPlaceholderText("Título del evento");
    fireEvent.change(titleInput, { target: { value: events[0].title } });

    const clearButton = await screen.findByText("Limpiar filtros");
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getAllByTestId("event-card")).toHaveLength(events.length);
    });
  });
});
