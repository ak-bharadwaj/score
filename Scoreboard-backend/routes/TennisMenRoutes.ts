import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { TennisMenController } from "../controllers/TennisMenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import TennisMenEvent, { TennisMenScore } from "../types/TennisMenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    const event = await getEventByID<TennisMenEvent, TennisMenScore>(req.params.id);
    await saveHistory(req.params.id, event?.score, req.body, req.user?.name as string);
    await new TennisMenController().updateScore(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
