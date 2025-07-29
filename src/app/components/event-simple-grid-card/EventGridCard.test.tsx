import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import EventGridCard from "./EventGridCard";
import { Event } from "../../types/types";
import { events } from "../../../../testSetup/mockdata";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
const mockEvent: Event = events[0];

describe("EventGridCard", () => {
  it("renders event details", () => {
    render(
      <MemoryRouter>
        <EventGridCard event={mockEvent} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("event-card")).toBeInTheDocument();
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/secondaryBanner.jpg"
    );
  });

  it("navigates on click of COMPRAR button", () => {
    render(
      <MemoryRouter>
        <EventGridCard event={mockEvent} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("COMPRAR"));
    expect(mockNavigate).toHaveBeenCalledWith(`/buy?eventId=${mockEvent.id}`);
  });
});
