import { useState } from "react";
import {
  isSameDay,
  isAfter,
  fromUnixTime,
  startOfDay,
  isBefore,
  endOfDay,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Event } from "../../types/types";
import EventFilters from "../../components/events-filters/EventsFilters";
import { EventsGrid } from "../../components/events-simple-grid/EventsGrid";
import AboutFetch from "../../components/about-fetch/AboutFetch";

interface EventsPageProps {
  fetchEvents: () => Promise<Event[]>;
}

export default function EventsPage({ fetchEvents }: EventsPageProps) {
  const { data, isLoading, error } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [eventTitle, setEventTitle] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  const clearFilters = () => {
    setEventTitle("");
    setCityFilter("");
    setCategoryFilter("");
    setDateFilter(null);
  };

  const events = (data ?? []) as Event[];

  const filteredEvents = events
    .filter((event) => {
      const matchesTitle = eventTitle
        ? event.title.toLowerCase().includes(eventTitle.toLowerCase())
        : true;
      const matchesCity = cityFilter
        ? event.venue.city.toLowerCase().includes(cityFilter.toLowerCase())
        : true;
      const matchesCategory = categoryFilter
        ? event.category.toLowerCase().includes(categoryFilter.toLowerCase())
        : true;

      const startDate = startOfDay(new Date(event.startTime));
      const endDate = endOfDay(new Date(event.endTime));

      const matchesDate = dateFilter
        ? isSameDay(dateFilter, startDate) ||
          isSameDay(dateFilter, endDate) ||
          (isAfter(dateFilter, startDate) && isBefore(dateFilter, endDate))
        : true;

      return matchesTitle && matchesCity && matchesCategory && matchesDate;
    })
    .sort(
      (a, b) =>
        fromUnixTime(a.startTime).getTime() -
        fromUnixTime(b.startTime).getTime()
    );

  if (isLoading || error)
    return (
      <AboutFetch
        isLoading={isLoading}
        error={error || Error("An error occurred while fetching events.")}
      />
    );

  return (
    <div className="w-full mx-auto px-12 py-12 flex-1">
      <EventFilters
        eventTitle={eventTitle}
        setEvenTitle={setEventTitle}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        clearFilters={clearFilters}
      />

      <div data-testid="events-material-grid">
        <EventsGrid events={filteredEvents} />
      </div>
    </div>
  );
}
