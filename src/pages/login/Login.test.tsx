import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Login from "./Login";

const mockSigninRedirect = vi.fn();

vi.mock("../../auth/AuthProvider", () => ({
  useAuth: () => ({
    signinRedirect: mockSigninRedirect,
  }),
}));

describe("Login component", () => {
  it("renders the login button", () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("signin is called when the button is clicked", () => {
    render(<Login />);
    fireEvent.click(screen.getByText("Login"));
    expect(mockSigninRedirect).toHaveBeenCalled();
  });
});
