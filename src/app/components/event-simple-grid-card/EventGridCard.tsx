import { Event } from "../../types/types";
import { useNavigate } from "react-router-dom";
import imgService from "../../services/imgService";

interface EventGridCardProps {
  event: Event;
}

const EventGridCard = ({ event }: EventGridCardProps) => {
  const banner = event.banners.find((a) => a.isSecond);
  const navigate = useNavigate();

  return (
    <div
      className="bg-brand-card rounded-xl p-4 shadow-md text-brand-white text-base text-md md:text-lg"
      key={event.id}
    >
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Image section */}
        <div className="flex flex-col items-start w-full md:w-1/2 space-y-2">
          <img
            src={imgService(banner?.imageUrl || "test-banner", false)}
            alt={event.title}
            className="h-64 w-full object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2 space-y-2">
          <div className="p-2 md:p-4 flex-grow">
            <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
            <p className="text-sm text-brand-darkText mb-1">
              Categoría: {event.category}
            </p>
            <p className="text-sm text-brand-darkText mb-1">
              Ciudad: {event.venue.city} - {event.venue.country}
            </p>
            <p className="text-xs text-brand-accent">
              {new Date(event.startTime).toLocaleDateString()} -{" "}
              {new Date(event.endTime).toLocaleDateString()}
            </p>
          </div>
          <div className="text-center mb-2 md:mb-4">
            <button
              className="bg-brand-white text-brand-darkerText hover:bg-brand-accent py-2 px-4 rounded transition duration-200"
              onClick={() => navigate(`/buy?eventId=${event.id}`)}
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventGridCard;
