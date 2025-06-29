import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import { Event } from "../../types/types";
import "@testing-library/jest-dom";
import { events } from "../../../../testSetup/mockdata/mockdata";

const fetchEvents = () => events;

describe("Home component", () => {
  it("renders category pills including 'All'", () => {
    render(<Home fetchEvents={fetchEvents} />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText(events[0].categeory)).toBeInTheDocument();
  });

  it("shows only events with a main banner", () => {
    render(<Home fetchEvents={fetchEvents} />);
    expect(
      screen.queryByAltText(`banner-${events[10].id}`)
    ).not.toBeInTheDocument();
    expect(screen.getByAltText(`banner-${events[0].id}`)).toBeInTheDocument();
  });

  it("filters events by selected category", () => {
    render(<Home fetchEvents={fetchEvents} />);

    fireEvent.click(screen.getByText(events[1].categeory));

    waitFor(() => {
      expect(screen.getByAltText(`banner-${events[0].id}`)).toBeInTheDocument();
      expect(
        screen.getByAltText(`banner-${events[0].id}`)
      ).not.toBeInTheDocument();
    });
  });
});
