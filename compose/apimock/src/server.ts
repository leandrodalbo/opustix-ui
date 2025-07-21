import express from "express";
import path from "path";
import { readFileSync } from "fs";
import cors from "cors";

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const eventsFile = path.join(__dirname, "../data/eventsall.json");
const eventDetailsFile = path.join(__dirname, "../data/eventdetails.json");
const purchaseFile = path.join(__dirname, "../data/purchase.json");

const events = JSON.parse(readFileSync(eventsFile, "utf-8"));

app.get("/api/public/ticketera/events/all", (req, res) => {
  res.json(events);
});

app.get(
  "/api/private/ticketera/events/d5a1b3f0-1a4e-4bfa-a8b2-1234567890ab/details",
  (req, res) => {
    res.json(eventDetailsFile);
  }
);

app.post("/api/private/ticketera/ticketera/reservations/new", (req, res) => {
  res.json(purchaseFile);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
