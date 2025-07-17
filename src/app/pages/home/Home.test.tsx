import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import { events } from "../../../../testSetup/mockdata";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const fetchEvents = vi.fn().mockResolvedValue(events);

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
}

describe("Home component", () => {
  it("renders category pills including 'All'", async () => {
    renderWithClient(<Home fetchEvents={fetchEvents} />);

    expect(await screen.findByText("All")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: events[0].category })
    ).toBeInTheDocument();
  });

  it("shows events with main banners on 'All' category", async () => {
    renderWithClient(<Home fetchEvents={fetchEvents} />);

    const eventsWithMainBanners = events.filter((event) =>
      event.banners.some((banner) => banner.isMain)
    );

    for (const event of eventsWithMainBanners) {
      expect(
        await screen.findByAltText(`banner-${event.id}`)
      ).toBeInTheDocument();
    }
  });

  it("filters events by selected category", async () => {
    renderWithClient(<Home fetchEvents={fetchEvents} />);

    const categoryButton = await screen.findByRole("button", {
      name: events[1].category,
    });

    fireEvent.click(categoryButton);

    await waitFor(() => {
      expect(screen.getByText(events[1].title)).toBeInTheDocument();
      expect(screen.queryByText(events[0].title)).not.toBeInTheDocument();
    });
  });
});
