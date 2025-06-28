import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
});

describe("Profile Page", () => {
  it("renders Logout button", async () => {
    vi.doMock("../../auth/AuthProvider", () => ({
      useAuth: () => ({
        user: { name: "testuser" },
        signoutRedirect: vi.fn(),
        signinRedirect: vi.fn(),
      }),
    }));

    const { default: Profile } = await import("./Profile");
    render(<Profile />);
    expect(screen.getByText("LOGOUT")).toBeInTheDocument();
  });

  it("renders Login button", async () => {
    vi.doMock("../../auth/AuthProvider", () => ({
      useAuth: () => ({
        user: null,
        signoutRedirect: vi.fn(),
        signinRedirect: vi.fn(),
      }),
    }));

    const { default: Profile } = await import("./Profile");
    render(<Profile />);
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });
});
