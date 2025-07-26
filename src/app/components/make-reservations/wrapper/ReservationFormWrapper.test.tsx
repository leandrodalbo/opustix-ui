import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReservationFormWrapper from "./ReservationFormWrapper";
import { vi } from "vitest";
import { EventDetails, NewReservation } from "../../../types/types";
import { eventdetails } from "../../../../../testSetup/mockdata";

const mockEventDetails: EventDetails = eventdetails;

describe("ReservationFormWrapper", () => {
  it("renders child components", () => {
    render(
      <ReservationFormWrapper
        eventDetails={mockEventDetails}
        submitReservations={vi.fn()}
      />
    );

    expect(screen.getByTestId("reservations-selector")).toBeInTheDocument();
    expect(screen.getByTestId("reservations-summary")).toBeInTheDocument();
    expect(screen.getByText(/Summer Music Festival 2025/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Agregar Reserva/i })
    ).toBeInTheDocument();
  });
});
