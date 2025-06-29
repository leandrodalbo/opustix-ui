import { render, screen } from "@testing-library/react";
import Events from "./Events";

describe("Profile Page", () => {
  it("renders Profile page", () => {
    render(<Events />);
    expect(screen.getByText(/Events/i)).toBeInTheDocument();
  });
});
