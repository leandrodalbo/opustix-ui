import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("renders copyright text with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Opustix. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("renders Discord link with correct href and label", () => {
    render(<Footer />);
    const discordLink = screen.getByLabelText("Discord");
    expect(discordLink).toBeInTheDocument();
  });

  it("renders Twitter link with correct href and label", () => {
    render(<Footer />);
    const twitterLink = screen.getByLabelText("Twitter");
    expect(twitterLink).toBeInTheDocument();
  });

  it("renders Youtube link with correct href and label", () => {
    render(<Footer />);
    const youtubeLink = screen.getByLabelText("Youtube");
    expect(youtubeLink).toBeInTheDocument();
  });
});
