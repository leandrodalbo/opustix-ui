import { useState } from "react";
import { CategoryPills } from "../../components/CategoryPills/CategoryPills";
import { Event } from "../../types/types";
import { EventsThumbnailGrid } from "../../components/events-thumbnail-grid/EventsThumbnailGrid";
import { EventsBanners } from "../../components/events-banners/EventsBanners";
import { useQuery } from "@tanstack/react-query";
import AboutFetch from "../../components/about-fetch/AboutFetch";

interface HomeProps {
  fetchEvents: () => Promise<Event[]>;
}

const Home = ({ fetchEvents }: HomeProps) => {
  const { data, isLoading, error } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const events = (data ?? []) as Event[];

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

  if (isLoading || error)
    return (
      <AboutFetch
        isLoading={isLoading}
        error={error || Error("An error occurred while fetching events.")}
      />
    );

  return (
    <div className="bg-brand-dargBg text-brand-white min-h-screen px-4 py-4">
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
