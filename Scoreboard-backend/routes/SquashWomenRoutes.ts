import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import { SquashWomenController } from "../controllers/SquashWomenController";
import { saveHistory } from "../utils/HistoryUtils";
import { getEventByID } from "../utils/EventUtils";
import SquashWomenEvent, { SquashWomenScore } from "../types/SquashWomenEvent";

const router = express.Router();

router.put("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    const event = await getEventByID<SquashWomenEvent, SquashWomenScore>(req.params.id);
    await saveHistory(req.params.id, event?.score, req.body, req.user?.name as string);
    await new SquashWomenController().updateScore(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
