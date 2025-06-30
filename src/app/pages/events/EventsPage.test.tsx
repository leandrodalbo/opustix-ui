import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventsPage from "./EventsPage"; // Adjust path
import { vi } from "vitest";
import { events } from "../../../../testSetup/mockdata/mockdata";

const fetchEvents = () => events;

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
    render(<EventsPage fetchEvents={fetchEvents} />);
  };

  it("renders all events by default", () => {
    setup();
    expect(screen.getAllByTestId("event-card")).toHaveLength(events.length);
  });

  it("filters by title", () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText("Event Title"), {
      target: { value: events[0].title },
    });
    expect(screen.getAllByTestId("event-card")).toHaveLength(
      events.filter((e) => e.title.includes(events[0].title)).length
    );
  });

  it("filters by city", () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText("Ciudad"), {
      target: { value: events[0].venue.city },
    });
    expect(screen.getAllByTestId("event-card")).toHaveLength(
      events.filter((e) => e.venue.city.includes(events[0].venue.city)).length
    );
  });

  it("filters by category", () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText("Categoría"), {
      target: { value: events[0].category },
    });
    expect(screen.getAllByTestId("event-card")).toHaveLength(
      events.filter((e) => e.category.includes(events[0].category)).length
    );
  });

  it("clears filters", () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText("Event Title"), {
      target: { value: events[0].title },
    });
    fireEvent.click(screen.getByText("Limpiar filtros"));
    expect(screen.getAllByTestId("event-card")).toHaveLength(events.length);
  });
});
