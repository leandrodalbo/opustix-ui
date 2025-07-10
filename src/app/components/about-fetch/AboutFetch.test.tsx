import { render, screen } from "@testing-library/react";
import AboutFetch from "./AboutFetch";

describe("AboutFetch component", () => {
  it("displays loading message when isLoading is true", () => {
    render(<AboutFetch isLoading={true} error={null as any} />);
    expect(screen.getByText("🔄 Loading...")).toBeInTheDocument();
  });

  it("displays error message when error is provided", () => {
    const error = new Error("Something went wrong");
    render(<AboutFetch isLoading={false} error={error} />);
    expect(screen.getByText(/⚠️ Something went wrong/i)).toBeInTheDocument();
  });
});
