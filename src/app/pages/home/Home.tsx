import { useState } from "react";
import { CategoryPills } from "../../components/CategoryPills/CategoryPills";
import { Event } from "../../types/types";
import { EventsThumbnailGrid } from "../../components/events-thumbnail-grid/EventsThumbnailGrid";
import { EventsBanners } from "../../components/events-banners/EventsBanners";

interface HomeProps {
  fetchEvents: () => Event[];
}

const Home = ({ fetchEvents }: HomeProps) => {
  const events = fetchEvents();

  const categories = [
    "All",
    ...Array.from(new Set(events.map((event: Event) => event.category))),
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const eventsWithMainBanners = events.filter((event: Event) => {
    return event.banners.some((b) => b.isMain);
  });

  const eventsWithSecondBanners = events.filter((event: Event) => {
    const hasSecondBanner = event.banners.some((b) => b.isSecond);
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return hasSecondBanner && matchesCategory;
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

      {selectedCategory === "All" && (
        <EventsBanners events={eventsWithMainBanners} />
      )}

      <EventsThumbnailGrid events={eventsWithSecondBanners} />
    </div>
  );
};

export default Home;
