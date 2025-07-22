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
const eventDetails = JSON.parse(readFileSync(eventDetailsFile, "utf-8"));
const purchase = JSON.parse(readFileSync(purchaseFile, "utf-8"));

app.get("/api/public/ticketera/events/all", (req, res) => {
  res.json(events);
});

app.get("/api/private/ticketera/events/:eventId/details", (req, res) => {
  res.json(eventDetails);
});

app.post("/api/private/ticketera/reservations/new", (req, res) => {
  res.json(purchase);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
