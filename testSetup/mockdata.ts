import { Event, EventDetails, Purchase } from "../src/app/types/types";
import { readFileSync } from "fs";
import path from "path";

const eventsAllFile = path.join(
  __dirname,
  "../compose/apimock/data/eventsall.json"
);

const eventsDetailsFile = path.join(
  __dirname,
  "../compose/apimock/data/eventdetails.json"
);

const purchaseFile = path.join(
  __dirname,
  "../compose/apimock/data/purchase.json"
);

export const events: Event[] = JSON.parse(readFileSync(eventsAllFile, "utf-8"));

export const eventdetails: EventDetails = JSON.parse(
  readFileSync(eventsDetailsFile, "utf-8")
);

export const purchase: Purchase = JSON.parse(
  readFileSync(purchaseFile, "utf-8")
);
