import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

describe("App Routing", () => {
  it("renders Home component on / route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("renders Events component on /events route", () => {
    render(
      <MemoryRouter initialEntries={["/events"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Events/i)).toBeInTheDocument();
  });

  it("renders Profile component on /profile route", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  it("renders Login component on /login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
