import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { vi } from "vitest";

vi.mock("../auth/AuthProvider", () => ({
  useAuth: () => ({
    user: { name: "testuser", profile: { realm_access: { roles: ["USER"] } } },
    isLoading: false,
    signinRedirect: vi.fn(),
    signoutRedirect: vi.fn(),
  }),
}));

describe("App Routing", () => {
  const renderWithProviders = (route: string) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
  };

  it("renders Home component on / route", () => {
    renderWithProviders("/");
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("renders Events component on /events route", () => {
    renderWithProviders("/events");
    expect(screen.getByText(/Events/i)).toBeInTheDocument();
  });

  it("renders Cartelera component on /cartelera", () => {
    renderWithProviders("/cartelera");
    expect(screen.getByText(/Cartelera/i)).toBeInTheDocument();
  });

  it("redirect user to Profile page", () => {
    renderWithProviders("/login");
    expect(screen.getByText(/LOGOUT/i)).toBeInTheDocument();
  });

  it("/events/management requires ADMIN/ORGANIZER", () => {
    renderWithProviders("/events/management");
    expect(screen.getByText(/🚫 You do not have access/i)).toBeInTheDocument();
  });
});
