import "dotenv/config";

import express from "express";
import cors from "cors";

import recommendationRouter from "./routes/recommendation.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Finance AI API is running",
  });
});

app.use("/api/recommendations", recommendationRouter);

export default app;
