import { useState } from "react";
import { CategoryPills } from "../../components/CategoryPills/CategoryPills";
import { Event } from "../../types/types";
import MainBanner from "../../components/main-banner/MainBanner";

interface HomeProps {
  fetchEvents: () => Event[];
}

const Home = ({ fetchEvents }: HomeProps) => {
  const events = fetchEvents();

  const categories = [
    "All",
    ...Array.from(new Set(events.map((event: Event) => event.categeory))),
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredEvents = events.filter((event: Event) => {
    const hasMainBanner = event.banners.some((b) => b.isMain);
    const matchesCategory =
      selectedCategory === "All" || event.categeory === selectedCategory;
    return hasMainBanner && matchesCategory;
  });

  return (
    <div className="bg-black text-black min-h-screen px-4 py-2">
      <div className="sticky top-0 bg-black z-10 pb-4">
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {filteredEvents.map((event: Event) => {
        const mainBanner = event.banners.find((b) => b.isMain);

        return (
          mainBanner && (
            <MainBanner
              key={mainBanner.id}
              banner={mainBanner.imageUrl}
              altValue={`banner-${event.id}`}
            />
          )
        );
      })}
    </div>
  );
};

export default Home;
