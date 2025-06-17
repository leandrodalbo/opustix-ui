import { render, screen } from "@testing-library/react";
import Profile from "./Profile";
import { AuthProvider } from "../../auth/AuthProvider";
import { vi } from "vitest";

vi.mock("../../auth/AuthProvider", () => ({
  useAuth: () => ({
    signoutRedirect: vi.fn(),
    user: { name: "testuser" },
  }),
}));

describe("Profile Page", () => {
  it("renders Logout button", () => {
    render(<Profile />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });
});
