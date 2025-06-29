import { useRef } from "react";
import { CategoryButton } from "../category-button/CategoryButton";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative px-2">
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="flex gap-3 w-max min-w-fit mx-auto whitespace-nowrap">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              onClick={() => onSelect(category)}
              variant={selectedCategory === category ? "dark" : "default"}
              className="py-1 px-3 rounded-lg whitespace-nowrap tracking-wider"
            >
              {category}
            </CategoryButton>
          ))}
        </div>
      </div>
    </div>
  );
}
