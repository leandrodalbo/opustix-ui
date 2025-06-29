import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import { events } from "../../../../testSetup/mockdata/mockdata";
import "@testing-library/jest-dom";

const fetchEvents = () => events;

describe("Home component", () => {
  it("renders category pills including 'All'", () => {
    render(<Home fetchEvents={fetchEvents} />);
    expect(screen.getByText("All")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: events[0].category })
    ).toBeInTheDocument();
  });

  it("shows events with main banners on 'All' category", () => {
    render(<Home fetchEvents={fetchEvents} />);
    const eventsWithMainBanners = events.filter((event) =>
      event.banners.some((banner) => banner.isMain)
    );
    eventsWithMainBanners.forEach((event) => {
      expect(screen.getByAltText(`banner-${event.id}`)).toBeInTheDocument();
    });
  });

  it("filters events by selected category", async () => {
    render(<Home fetchEvents={fetchEvents} />);

    fireEvent.click(screen.getByRole("button", { name: events[1].category }));

    await waitFor(() => {
      expect(screen.getByText(events[1].title)).toBeInTheDocument();
      expect(screen.queryByAltText(events[0].title)).not.toBeInTheDocument();
    });
  });
});
