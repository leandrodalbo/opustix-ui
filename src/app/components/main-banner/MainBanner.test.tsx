import { render, screen } from "@testing-library/react";
import MainBanner from "./MainBanner";
import "@testing-library/jest-dom";

describe("MainBanner", () => {
  const bannerUrl = "https://example.com/banner.jpg";
  const altText = "Sample Banner";

  it("renders the image with the correct src and alt attributes", () => {
    render(<MainBanner banner={bannerUrl} altValue={altText} />);
    const img = screen.getByAltText(altText);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", bannerUrl);
  });
});
