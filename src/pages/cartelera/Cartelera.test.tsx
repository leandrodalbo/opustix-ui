import { render, screen } from "@testing-library/react";
import Cartelera from "./Cartelera";

describe("Cartelera Page", () => {
  it("renders Cartelera page", () => {
    render(<Cartelera />);
    expect(screen.getByText(/Cartelera/i)).toBeInTheDocument();
  });
});
