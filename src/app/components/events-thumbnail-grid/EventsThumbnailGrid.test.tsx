import { render, screen } from "@testing-library/react";
import { EventsThumbnailGrid } from "./EventsThumbnailGrid";
import { Event } from "../../types/types";
import "@testing-library/jest-dom";

import { events } from "../../../../testSetup/mockdata/mockdata";

describe("EventsThumbnailGrid", () => {
  it("renders events correctly", () => {
    render(<EventsThumbnailGrid events={events} />);

    const eventsWithSecondBanners = events.filter((event: Event) =>
      event.banners.some((b) => b.isSecond)
    );

    eventsWithSecondBanners.forEach((event: Event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
      expect(screen.getByText(event.category)).toBeInTheDocument();
    });
  });
});
