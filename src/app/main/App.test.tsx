import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { vi } from "vitest";
import { events, eventdetails, purchase } from "../../../testSetup/mockdata";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function appRender(route: string, ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  return render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>
  );
}

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

  fetchEventDetails: vi.fn(() => {
    return eventdetails;
  }),
}));

vi.mock("../services/reservations", async () => {
  return {
    default: vi.fn(() => purchase),
  };
});

describe("App Routing", () => {
  it("renders Home component on / route", async () => {
    appRender("/", <App />);
    expect(
      await screen.findByRole("button", { name: "All" })
    ).toBeInTheDocument();
    expect(
      await screen.findByAltText(`banner-${events[0].id}`)
    ).toBeInTheDocument();
  });

  it("renders Events component on /events route", async () => {
    appRender("/events", <App />);

    expect(
      await screen.findByPlaceholderText("Título del evento")
    ).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Ciudad")).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Categoría")).toBeInTheDocument();
    expect(
      await screen.findByTestId("events-material-grid")
    ).toBeInTheDocument();
  });

  it("redirect user to Profile page", () => {
    appRender("/login", <App />);
    expect(screen.getByText(/LOGOUT/i)).toBeInTheDocument();
  });

  it("/events/management requires ADMIN/ORGANIZER", () => {
    appRender("/events/management", <App />);
    expect(screen.getByText(/🚫 You do not have access/i)).toBeInTheDocument();
  });

  it("renders Contact component on /contacto route", () => {
    appRender("/contacto", <App />);
    expect(screen.getByText(/📞 Contacta con nosotros/i)).toBeInTheDocument();
  });

  it("renders Reservations Component", () => {
    appRender(`/buy?eventId=${events[0].id}`, <App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
