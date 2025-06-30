import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EventsMaterialGrid } from "./EventsMaterialGrid"; // Adjust import path
import { events } from "../../../../testSetup/mockdata/mockdata";

import { fromUnixTime } from "date-fns";

describe("EventsMaterialGrid", () => {
  it("renders the correct number of event cards", () => {
    render(<EventsMaterialGrid events={events} />);
    const titles = screen.getAllByRole("heading", { level: 6 });
    expect(titles).toHaveLength(events.length);
  });

  it("displays event titles, categories, venues, and dates", () => {
    render(<EventsMaterialGrid events={[events[0]]} />);

    expect(screen.getByText(events[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(`Categoria: ${events[0].category}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Ciudad: ${events[0].venue.city} - ${events[0].venue.country}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${fromUnixTime(events[0].startTime).toLocaleDateString(
          "es-ES"
        )} - ${fromUnixTime(events[0].endTime).toLocaleDateString("es-ES")}`
      )
    ).toBeInTheDocument();
  });

  it("displays event banner images", () => {
    render(<EventsMaterialGrid events={events} />);
    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(events.length);
  });
});
