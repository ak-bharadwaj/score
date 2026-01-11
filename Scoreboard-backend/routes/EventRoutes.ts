import * as jwt from "jsonwebtoken";
import express from "express";

import FootballRoutes from "./FootballRoutes";
import ChessRoutes from "./ChessRoutes";
import SquashMenRoutes from "./SquashMenRoutes";
import SquashWomenRoutes from "./SquashWomenRoutes";
import TennisMenRoutes from "./TennisMenRoutes";
import TennisWomenRoutes from "./TennisWomenRoutes";
import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import AllEvents, { AllScores } from "../types/AllEvents";
import { User } from "../types/User";
import { EventController } from "../controllers/EventController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";

const router = express.Router();



router.use((req: AuthenticatedRequest, res, next) => {
  // needs to be either admin or score editor
  if (req.method === "OPTIONS") return res.sendStatus(200);

  // Allow public GET requests for event listing and single event view
  if (req.method === "GET" && (req.path === "/" || req.path === "")) return next();

  // Allow voting
  if (req.path.includes("/vote")) return next();

  // All other methods (POST, PUT, PATCH, DELETE) or non-root GETs need auth
  // Actually, let's just check if it's a GET request to a public route
  if (req.method === "GET" && !req.path.includes("toggleLive") && !req.path.includes("updateScore")) {
    return next();
  }

  if (!req.headers.authorization) return res.sendStatus(401);
  const [type, token] = req.headers.authorization.split(" ");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
    if (error) return res.sendStatus(403);
    user = user as User;
    delete user?.iat;
    delete user?.exp;
    if (!!user) req.user = user as User;
    next();
  });
});

router.use((error: Error, _: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(error);
  res.sendStatus(500);
});

router.get("/", async (_, res) => {
  res.json(await new EventController().getAllEvents());
});

router.get("/:id", async (req, res) => {
  res.json(await new EventController().getEventById(req.params.id));
});

router.use("/football", FootballRoutes);
router.use("/chess", ChessRoutes);
router.use("/squashmen", SquashMenRoutes);
router.use("/squashwomen", SquashWomenRoutes);
router.use("/tennismen", TennisMenRoutes);
router.use("/tenniswomen", TennisWomenRoutes);

router.patch("/toggleLive/:id", async (req, res, next) => {
  try {
    await new EventController().toggleLive(req.params.id);
    res.sendStatus(204);
  } catch (error: any) {
    next(error);
  }
});

router.put("/updateScore/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    const event = await getEventByID<AllEvents, AllScores>(req.params.id);
    await saveHistory(req.params.id, event?.score, req.body, req.user?.name as string);
    await new EventController().updateScore(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error: any) {
    console.error("Score update failed:", error);
    res.status(400).json({ message: error.message || "Score update failed" });
  }
});

router.post("/:id/winner", async (req, res, next) => {
  try {
    await new EventController().setWinner(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error: any) {
    console.error("Winner set failed:", error);
    res.status(400).json({ message: error.message || "Failed to set winner" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    console.log(`Deleting event: ${req.params.id}`);
    await new EventController().deleteEvent(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error(`Error deleting event ${req.params.id}:`, error);
    next(error);
  }
});

export default router;
