import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import CricketEvent, { CricketScore } from "../types/CricketEvent";
import { CricketController } from "../controllers/CricketController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<CricketEvent, CricketScore>(req.params.id))?.score, req.body, req.user?.name as string);
  await new CricketController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
