import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { ChessController } from "../controllers/ChessController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import ChessEvent, { ChessScore } from "../types/ChessEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    const event = await getEventByID<ChessEvent, ChessScore>(req.params.id);
    await saveHistory(req.params.id, event?.score, req.body, req.user?.name as string);
    await new ChessController().updateScore(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
