import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Profile Page", () => {
  it("renders Profile page", () => {
    render(<Home />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
