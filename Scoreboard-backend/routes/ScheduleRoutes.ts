import express from "express";
import { ScheduleController } from "../controllers/ScheduleController";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await new ScheduleController().getNotCompletedEvents());
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    await new ScheduleController().updateExistingEvents(req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete("/all", async (req, res, next) => {
  try {
    await new ScheduleController().deleteAllEvents();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
