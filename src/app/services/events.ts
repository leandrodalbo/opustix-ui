import { Event, EventDetails } from "../types/types";

import apiPublicFetch from "./apiPublicConfig";
import apiPrivateFetch from "./apiPrivateConfig";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await apiPublicFetch.get<Event[]>("/events/all");
  return response.data;
};

export const fetchEventDetails = async (
  eventId: string
): Promise<EventDetails> => {
  const response = await apiPrivateFetch.get<EventDetails>(
    `/events/${eventId}/details`
  );
  return response.data;
};

export default fetchEvents;
