import { render, screen } from "@testing-library/react";
import LiveEvents from "./LiveEvents";

describe("LiveEvents Page", () => {
  it("renders LiveEvents page", () => {
    render(<LiveEvents />);
    expect(screen.getByText(/LiveEvents/i)).toBeInTheDocument();
  });
});
