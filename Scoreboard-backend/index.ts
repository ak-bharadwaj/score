import express from "express";
import cors from "cors";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";
import compression from "compression";

import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { CorsConfig } from "./config/CorsConfig";
import swaggerConfig from "./config/swagger.json";
import { createAndStartServer } from "./utils/ServerUtils";
import EventRoutes from "./routes/EventRoutes";
import GlobalRoutes from "./routes/GlobalRoutes";
import path from "path";

config();

const app = express();

(app as any).use("/", express.json());
(app as any).use("/", compression());
(app as any).use("/", cors(CorsConfig));
// Mount Swagger UI via a Router to avoid type conflicts between different express type instances
const docsRouter = express.Router();
(docsRouter as any).use("/", ...swaggerUi.serve);
(docsRouter as any).get("/", swaggerUi.setup(swaggerConfig));
(app as any).use("/api/docs", docsRouter);
(app as any).use("/", express.static(path.join(__dirname, "../client/build"), { maxAge: "1d", etag: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
if (process.env.NODE_ENV === "production") {
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
}

app.use((req, res, next) => {
  console.log(`${req.ip} requested: ${req.url}`);
  next();
});

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

import { EventController } from "./controllers/EventController";

app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);

// Explicitly handle Voting Route here to bypass EventRoutes middleware issues
app.post("/api/events/:id/vote", async (req, res) => {
  try {
    await new EventController().vote(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

app.use("/api/events", EventRoutes);
app.use("/api/global", GlobalRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

createAndStartServer(app);
// .then(() =>
//   new EventController().setWinner("657587eb472deab4723148ec", {
//     participants: [
//       { name: "karan", team: "IITGN", time: 14 },
//       { name: "something", team: "IITB", time: 12 },
//     ],
//   })
// );
// .then(() => setWinner("656f1154c223ae2deba7cc4a", "655e4dbdbddc0c9ed41ad774"));
// addEvent<ChessEvent, ChessScore>(EventCatagories.CHESS, {
//   endTime: Date.now(),
//   startTime: Date.now(),
//   event: EventCatagories.CHESS,
//   teams: ["655e4dbdbddc0c9ed41ad774", "655e4dc8992db97369908276"],
//   title: "Test football match",
// });

// toggleEventStarted("655e5cad5d79240e556d346f")
//   .then(() => getLiveEvents())
//   .then(data => console.log(data));

// getLiveEvents().then(data => console.log(data));
