import React from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";
import { AuthProvider, useAuth } from "./AuthProvider";

// Use `var`, not `const` or `let`, to avoid TDZ issues due to hoisting
var getUserMock: any;
var signinRedirectMock: any;
var signoutRedirectMock: any;
var addUserLoadedMock: any;
var addUserUnloadedMock: any;

vi.mock("oidc-client-ts", () => {
  getUserMock = vi.fn();
  signinRedirectMock = vi.fn();
  signoutRedirectMock = vi.fn();
  addUserLoadedMock = vi.fn();
  addUserUnloadedMock = vi.fn();

  return {
    UserManager: vi.fn().mockImplementation(() => ({
      get getUser() {
        return getUserMock;
      },
      signinRedirect: signinRedirectMock,
      signoutRedirect: signoutRedirectMock,
      events: {
        addUserLoaded: addUserLoadedMock,
        addUserUnloaded: addUserUnloadedMock,
      },
    })),
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserMock.mockReset();
  });

  it("returns null user when getUser resolves null", async () => {
    getUserMock.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });

    expect(getUserMock).toHaveBeenCalled();
  });

  it("sets user when getUser resolves valid user", async () => {
    const fakeUser = { expired: false, profile: { sub: "abc" } };
    getUserMock.mockResolvedValueOnce(fakeUser);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toEqual(fakeUser);
    });
  });

  it("signin and redirect", async () => {
    getUserMock.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });

    act(() => {
      result.current.signinRedirect();
    });

    expect(signinRedirectMock).toHaveBeenCalled();
  });

  it("signout and redirect", async () => {
    getUserMock.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });

    act(() => {
      result.current.signoutRedirect();
    });

    expect(signoutRedirectMock).toHaveBeenCalled();
  });

  it("throws error if used outside AuthProvider", () => {
    const run = () => renderHook(() => useAuth());
    expect(run).toThrow("useAuth must be used within an AuthProvider");
  });
});
