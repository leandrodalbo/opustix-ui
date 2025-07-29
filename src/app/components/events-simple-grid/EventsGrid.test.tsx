import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventsGrid } from "./EventsGrid";
import { Event } from "../../types/types";

import { events } from "../../../../testSetup/mockdata";

vi.mock("../event-simple-grid-card/EventGridCard", () => ({
  default: ({ event }: { event: Event }) => (
    <div data-testid="mock-event-card">{event.title}</div>
  ),
}));

const mockEvents: Event[] = events;

describe("EventsGrid", () => {
  it("renders multiple EventGridCard components", () => {
    render(<EventsGrid events={mockEvents} />);

    const cards = screen.getAllByTestId("mock-event-card");
    expect(cards).toHaveLength(mockEvents.length);
  });

  it("renders fallback message when events list is empty", () => {
    render(<EventsGrid events={[]} />);

    expect(screen.getByText(/No se econtraron eventos/i)).toBeInTheDocument();
  });
});
