import { Event } from "../../types/types";
import MainBanner from "../main-banner/MainBanner";

type EventsBannersProps = {
  events: Event[];
};
export const EventsBanners = ({ events }: EventsBannersProps) => {
  return (
    <div className="mt-6">
      {events.map((event: Event) => {
        const mainBanner = event.banners.find((a) => a.isMain);

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
