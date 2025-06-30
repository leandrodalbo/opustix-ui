import { useState } from "react";
import {
  isSameDay,
  isAfter,
  fromUnixTime,
  startOfDay,
  isBefore,
} from "date-fns";
import { Box } from "@mui/material";

import { Event } from "../../types/types";
import EventFilters from "../../components/events-filters/EventsFilters";
import { EventsMaterialGrid } from "../../components/events-grid/EventsMaterialGrid";

interface EventsPageProps {
  fetchEvents: () => Event[];
}

export default function EventsPage({ fetchEvents }: EventsPageProps) {
  const eventsData = fetchEvents();

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

  const filteredEvents = eventsData
    .filter((event) => {
      const matchesTitle =
        eventTitle.length > 0
          ? event.title.toLowerCase().includes(eventTitle.toLowerCase())
          : true;

      const matchesCity =
        cityFilter.length > 0
          ? event.venue.city.toLowerCase().includes(cityFilter.toLowerCase())
          : true;

      const matchesCategory =
        categoryFilter.length > 0
          ? event.category.toLowerCase().includes(categoryFilter.toLowerCase())
          : true;

      const startDate = startOfDay(fromUnixTime(event.startTime));
      const endDate = startOfDay(fromUnixTime(event.endTime));

      const matchesDate = dateFilter
        ? isSameDay(startOfDay(dateFilter), startDate) ||
          isSameDay(startOfDay(dateFilter), endDate) ||
          (isAfter(startOfDay(dateFilter), startDate) &&
            isBefore(startOfDay(dateFilter), endDate))
        : true;

      return matchesTitle && matchesCity && matchesCategory && matchesDate;
    })
    .sort((a, b) => {
      const dateA = fromUnixTime(a.startTime);
      const dateB = fromUnixTime(b.startTime);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <Box
      p={4}
      sx={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}
    >
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
        <EventsMaterialGrid events={filteredEvents} />
      </div>
    </Box>
  );
}
