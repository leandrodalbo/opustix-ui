import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryPills } from "./CategoryPills";
import "@testing-library/jest-dom";

describe("CategoryPills", () => {
  const categories = ["All", "Music", "Sports", "Tech"];
  const onSelectMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all category buttons", () => {
    render(
      <CategoryPills
        categories={categories}
        selectedCategory="All"
        onSelect={onSelectMock}
      />
    );

    categories.forEach((category) => {
      expect(
        screen.getByRole("button", { name: category })
      ).toBeInTheDocument();
    });
  });

  it("highlights the selected category with 'dark' variant", () => {
    render(
      <CategoryPills
        categories={categories}
        selectedCategory="Music"
        onSelect={onSelectMock}
      />
    );

    const selectedButton = screen.getByRole("button", { name: "Music" });
    expect(selectedButton).toHaveClass("bg-brand-accent");
  });

  it("calls onSelect with correct category when a button is clicked", () => {
    render(
      <CategoryPills
        categories={categories}
        selectedCategory="All"
        onSelect={onSelectMock}
      />
    );

    const button = screen.getByRole("button", { name: "Tech" });
    fireEvent.click(button);
    expect(onSelectMock).toHaveBeenCalledWith("Tech");
  });

  it("applies scrollable container with correct styling", () => {
    const { container } = render(
      <CategoryPills
        categories={categories}
        selectedCategory="All"
        onSelect={onSelectMock}
      />
    );

    const scrollDiv = container.querySelector(".overflow-x-auto");
    expect(scrollDiv).toBeInTheDocument();
    expect(scrollDiv).toHaveClass("scroll-smooth", "scrollbar-hide");
  });
});
