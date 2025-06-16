import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login Page", () => {
  it("renders login form", () => {
    render(<Login />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
