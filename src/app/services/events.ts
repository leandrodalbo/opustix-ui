import { Event } from "../types/types";

import apiFetch from "./apiConfig";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await apiFetch.get<Event[]>(
    "/api/public/ticketera/events/all"
  );
  return response.data;
};

export default fetchEvents;
