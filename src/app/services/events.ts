import { events } from "../../../testSetup/mockdata/mockdata";
import { Event } from "../types/types";

const fetchEvents = (): Event[] => {
  return events;
};

export { fetchEvents };
