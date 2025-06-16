import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "../auth/AuthProvider";

describe("App Routing", () => {
  const renderWithProviders = (route: string) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <App />
        </AuthProvider>
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

  it("renders Profile component on /profile route", () => {
    renderWithProviders("/profile");
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  it("renders Login component on /login route", () => {
    renderWithProviders("/login");
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
