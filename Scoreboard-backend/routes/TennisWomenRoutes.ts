import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { TennisWomenController } from "../controllers/TennisWomenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import TennisWomenEvent, { TennisWomenScore } from "../types/TennisWomenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<TennisWomenEvent, TennisWomenScore>(req.params.id))?.score, req.body, req.user?.name as string);
  await new TennisWomenController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
