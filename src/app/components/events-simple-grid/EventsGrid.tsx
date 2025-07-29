import { Event } from "../../types/types";
import EventGridCard from "../event-simple-grid-card/EventGridCard";

interface EventsGridProps {
  events: Event[];
}

export const EventsGrid = ({ events }: EventsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8">
      {events.length === 0 && (
        <p className="bg-brand-danger text-center col-span-full py-4 rounded">
          No se econtraron eventos.
        </p>
      )}

      {events.length > 0 &&
        events.map((it) => <EventGridCard event={it} key={it.id} />)}
    </div>
  );
};
