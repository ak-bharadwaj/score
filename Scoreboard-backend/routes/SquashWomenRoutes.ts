import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { SquashWomenController } from "../controllers/SquashWomenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import SquashWomenEvent, { SquashWomenScore } from "../types/SquashWomenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<SquashWomenEvent, SquashWomenScore>(req.params.id))?.score, req.body, req.user?.name as string);
  await new SquashWomenController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
