import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { SquashMenController } from "../controllers/SquashMenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import SquashMenEvent, { SquashMenScore } from "../types/SquashMenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    const event = await getEventByID<SquashMenEvent, SquashMenScore>(req.params.id);
    await saveHistory(req.params.id, event?.score, req.body, req.user?.name as string);
    await new SquashMenController().updateScore(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
