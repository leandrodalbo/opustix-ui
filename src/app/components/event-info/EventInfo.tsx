import { fromUnixTime } from "date-fns";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EventDetails } from "../../types/types";
import imgService from "../../services/imgService";

interface EventInfoProps {
  eventDetails: EventDetails;
}

const EventInfo = ({ eventDetails }: EventInfoProps) => {
  const formattedStart = format(
    fromUnixTime(eventDetails.startTime / 1000),
    "d 'de' MMMM 'de' yyyy, HH:mm",
    { locale: es }
  );

  const formattedEnd = format(
    fromUnixTime(eventDetails.endTime / 1000),
    "d 'de' MMMM 'de' yyyy, HH:mm",
    { locale: es }
  );

  return (
    <div className="bg-brand-card rounded-2xl shadow-md p-4 text-brand-white">
      <img
        src={imgService(eventDetails.mainBanner, true)}
        alt={eventDetails.title}
        className="w-full object-cover rounded-xl max-h-72 mb-4"
      />

      <div>
        <h2 className="text-2xl font-semibold text-brand-accent">
          {eventDetails.title}
        </h2>
        <p className="text-brand-white mt-2">{eventDetails.description}</p>
        <p className="text-sm text-brand-white mt-4">
          🕒 {formattedStart} - {formattedEnd}
        </p>
        <p className="text-sm text-brand-white mt-1">
          📍 {eventDetails.venueDto.name} - {eventDetails.venueDto.address}
        </p>
      </div>
    </div>
  );
};

export default EventInfo;
