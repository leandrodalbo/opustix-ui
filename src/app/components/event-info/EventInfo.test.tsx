import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventInfo from "./EventInfo";
import { EventDetails } from "../../types/types";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import { eventdetails } from "../../../../testSetup/mockdata";

const mockEvent: EventDetails = eventdetails;

describe("EventInfo", () => {
  it("renders event details correctly", () => {
    render(<EventInfo eventDetails={mockEvent} />);

    const image = screen.getByAltText(mockEvent.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockEvent.mainBanner);
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();

    const formattedStart = format(
      fromUnixTime(mockEvent.startTime / 1000),
      "d 'de' MMMM 'de' yyyy, HH:mm",
      { locale: es }
    );
    const formattedEnd = format(
      fromUnixTime(mockEvent.endTime / 1000),
      "d 'de' MMMM 'de' yyyy, HH:mm",
      { locale: es }
    );
    expect(
      screen.getByText(`🕒 ${formattedStart} - ${formattedEnd}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `📍 ${mockEvent.venueDto.name} - ${mockEvent.venueDto.address}`
      )
    ).toBeInTheDocument();
  });
});
