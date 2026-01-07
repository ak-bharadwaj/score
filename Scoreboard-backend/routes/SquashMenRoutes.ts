import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { SquashMenController } from "../controllers/SquashMenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import SquashMenEvent, { SquashMenScore } from "../types/SquashMenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res) => {
  await saveHistory(req.params.id, (await getEventByID<SquashMenEvent, SquashMenScore>(req.params.id))?.score, req.body, req.user?.name as string);
  await new SquashMenController().updateScore(req.params.id, req.body);
  res.sendStatus(204);
});

export default router;
