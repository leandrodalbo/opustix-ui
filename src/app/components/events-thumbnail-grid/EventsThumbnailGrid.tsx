import { Event } from "../../types/types";

type EventsThumbnailGridProps = {
  events: Event[];
};

export const EventsThumbnailGrid = ({ events }: EventsThumbnailGridProps) => {
  const thumbnailEvents = events
    .map((event) => ({
      ...event,
      thumbnail: event.banners.find((b) => b.isSecond),
    }))
    .filter((event) => event.thumbnail);

  return (
    <div className="mt-6">
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {thumbnailEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={event.thumbnail?.imageUrl}
              alt={`thumbnail-${event.id}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-white truncate">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400">{event.category}</p>
              <p className="text-xs text-gray-500 mt-1">
                📍{event.venue.name} — 🗓️{" "}
                {new Date(event.startTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
