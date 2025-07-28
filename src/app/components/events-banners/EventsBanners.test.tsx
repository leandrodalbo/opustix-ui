import { render, screen } from "@testing-library/react";
import { EventsBanners } from "./EventsBanners";
import { Event } from "../../types/types";
import { events } from "../../../../testSetup/mockdata";
import "@testing-library/jest-dom";
import imgService from "../../services/imgService";

describe("EventsBanners", () => {
  it("renders banners with correct src", () => {
    render(<EventsBanners events={events} />);
    const eventsWithMainBanners = events.filter((event: Event) =>
      event.banners.some((b) => b.isMain)
    );

    eventsWithMainBanners.forEach((event: Event) => {
      expect(screen.getByAltText(`banner-${events[0].id}`)).toHaveAttribute(
        "src",
        imgService(events[0].banners[1].imageUrl, true)
      );
    });
  });
});
