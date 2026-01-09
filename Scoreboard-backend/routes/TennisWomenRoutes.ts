import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { TennisWomenController } from "../controllers/TennisWomenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import TennisWomenEvent, { TennisWomenScore } from "../types/TennisWomenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    const event = await getEventByID<TennisWomenEvent, TennisWomenScore>(req.params.id);
    await saveHistory(req.params.id, event?.score, req.body, req.user?.name as string);
    await new TennisWomenController().updateScore(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
