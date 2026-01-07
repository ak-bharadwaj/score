import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { TennisMenController } from "../controllers/TennisMenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import TennisMenEvent, { TennisMenScore } from "../types/TennisMenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<TennisMenEvent, TennisMenScore>(req.params.id))?.score, req.body, req.user?.name as string);
  await new TennisMenController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
