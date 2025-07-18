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
const events = JSON.parse(readFileSync(eventsFile, "utf-8"));

app.get("/api/public/ticketera/events/all", (req, res) => {
  res.json(events);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
