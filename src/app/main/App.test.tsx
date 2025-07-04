import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { vi } from "vitest";
import { events } from "../../../testSetup/mockdata/mockdata";

vi.mock("../auth/AuthProvider", () => ({
  useAuth: () => ({
    user: { name: "testuser", profile: { realm_access: { roles: ["USER"] } } },
    isLoading: false,
    signinRedirect: vi.fn(),
    signoutRedirect: vi.fn(),
  }),
}));

vi.mock("../services/events", () => ({
  fetchEvents: vi.fn(() => {
    return events;
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
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByAltText(`banner-${events[0].id}`)).toBeInTheDocument();
  });

  it("renders Events component on /events route", () => {
    renderWithProviders("/events");
    expect(screen.getByPlaceholderText("Event Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ciudad")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Categoría")).toBeInTheDocument();
    expect(screen.getByTestId("events-material-grid")).toBeInTheDocument();
  });

  it("redirect user to Profile page", () => {
    renderWithProviders("/login");
    expect(screen.getByText(/LOGOUT/i)).toBeInTheDocument();
  });

  it("/events/management requires ADMIN/ORGANIZER", () => {
    renderWithProviders("/events/management");
    expect(screen.getByText(/🚫 You do not have access/i)).toBeInTheDocument();
  });

  it("renders Contact component on /contacto route", () => {
  renderWithProviders("/contacto");
  expect(screen.getByText(/📞 Contacta con nosotros/i)).toBeInTheDocument();
});

});
