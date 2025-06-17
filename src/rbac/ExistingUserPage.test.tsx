import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ExistingUserPage } from "./ExistingUserPage"; // adjust path
import { vi, Mock } from "vitest";

vi.mock("../auth/AuthProvider", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../auth/AuthProvider";
import Profile from "../pages/profile/Profile";
import EventsManagement from "../pages/events-management/EventsManagement";

const mockedUseAuth = useAuth as Mock;

describe("ExistingUserPage", () => {
  it("shows loading when isLoading is true", () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: true });

    render(
      <MemoryRouter>
        <ExistingUserPage>
          <Profile />
        </ExistingUserPage>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows children when user has required role", () => {
    mockedUseAuth.mockReturnValue({
      isLoading: false,
      user: {
        profile: {
          realm_access: { roles: ["USER", "ADMIN"] },
        },
      },
    });

    render(
      <MemoryRouter>
        <ExistingUserPage roles={["USER"]}>
          <EventsManagement />
        </ExistingUserPage>
      </MemoryRouter>
    );

    expect(screen.getByText(/EventsManagement/i)).toBeInTheDocument();
  });
});
