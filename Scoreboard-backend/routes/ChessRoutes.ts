import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { ChessController } from "../controllers/ChessController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import ChessEvent, { ChessScore } from "../types/ChessEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<ChessEvent, ChessScore>(req.params.id))?.score, req.body, req.user?.name as string);
  await new ChessController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
