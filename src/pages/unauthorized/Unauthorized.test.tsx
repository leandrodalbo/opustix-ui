import { render, screen } from "@testing-library/react";
import Unauthorized from "./Unauthorized";

describe("Unauthorized Page", () => {
  it("renders Unauthorized page", () => {
    render(<Unauthorized />);
    expect(screen.getByText(/🚫 You do not have access/i)).toBeInTheDocument();
  });
});
