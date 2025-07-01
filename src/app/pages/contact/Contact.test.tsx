import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact Page", () => {
  it("renders contact text", () => {
    render(<Contact />);
    expect(screen.getByText(/📞 Contacta con nosotros/i)).toBeInTheDocument();
  });
});
