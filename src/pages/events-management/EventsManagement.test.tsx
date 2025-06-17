import { render, screen } from "@testing-library/react";
import EventsManagement from "./EventsManagement";

describe("LiveEvents Page", () => {
  it("renders LiveEvents page", () => {
    render(<EventsManagement />);
    expect(screen.getByText(/EventsManagement/i)).toBeInTheDocument();
  });
});
