import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const resizeWindow = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event("resize"));
};

describe("NavigationBar", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders logo and login icon + nav items", () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByTitle("Usuario")).toBeInTheDocument();
    expect(screen.getByText("EVENTOS")).toBeInTheDocument();
    expect(screen.getByText("CARTELERA")).toBeInTheDocument();
  });

  it("renders menu button on mobile", () => {
    resizeWindow(500);
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("shows nav items when menu is opened on mobile", () => {
    resizeWindow(500);
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText("Toggle menu"));

    expect(screen.getByText("EVENTOS")).toBeInTheDocument();
    expect(screen.getByText("CARTELERA")).toBeInTheDocument();
  });
});
