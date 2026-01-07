import express from "express";
import { ScheduleController } from "../controllers/ScheduleController";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await new ScheduleController().getNotCompletedEvents());
});

router.patch("/", async (req, res) => {
  await new ScheduleController().updateExistingEvents(req.body);
  res.sendStatus(204);
});

export default router;
