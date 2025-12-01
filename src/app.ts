import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { errorHandler } from "./middlewares/error.middleware.js";
import v1Router from "./api/v1/index.js";
import { globalRateLimit } from "./middlewares/rateLimit.middleware.js";
import { requestLogger } from "./middlewares/logging.middleware.js";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(globalRateLimit);

app.use("/api/v1", v1Router);

app.get("/", (req, res) => {
  res.json({
    message: "Master Backend API",
    version: "1.0.0",
    endpoints: {
      v1: "/api/v1",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
