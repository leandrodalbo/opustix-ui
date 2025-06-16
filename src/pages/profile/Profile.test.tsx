import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

describe("Profile Page", () => {
  it("renders Profile page", () => {
    render(<Profile />);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });
});
