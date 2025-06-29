import { render, screen, waitFor } from "@testing-library/react";
import Callback from "./Callback";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("oidc-client-ts", () => {
  return {
    UserManager: vi.fn().mockImplementation(() => ({
      signinRedirectCallback: vi.fn().mockResolvedValue(undefined),
    })),
  };
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Callback component", () => {
  it("successfully signed-in", async () => {
    render(
      <MemoryRouter>
        <Callback />
      </MemoryRouter>
    );

    expect(screen.getByText("Signing in...")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
