import { Event } from "../src/app/types/types";
import { readFileSync } from "fs";
import path from "path";

const eventsAllFile = path.join(
  __dirname,
  "../compose/apimock/data/eventsall.json"
);

export const events: Event[] = JSON.parse(readFileSync(eventsAllFile, "utf-8"));
