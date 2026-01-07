import express from "express";

import { TeamControllers } from "../controllers/TeamController";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await new TeamControllers().getAllTeams());
});

router.get("/:name", async (req, res) => {
  res.json(await new TeamControllers().getTeamByName(req.params.name));
});

router.post("/", async (req, res) => {
  res.json(await new TeamControllers().addTeam(req.body));
});

router.delete("/:id", async (req, res) => {
  res.json(await new TeamControllers().deleteTeam(req.params.id));
});

router.patch("/:name/:medal", async (req, res) => {
  await new TeamControllers().addMedal(req.params.medal, req.params.name);
  res.sendStatus(204);
});

export default router;
