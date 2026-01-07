import express from "express";
import { GlobalController } from "../controllers/GlobalController";

const router = express.Router();

router.post("/broadcast", async (req, res) => {
    await new GlobalController().broadcast(req.body);
    res.sendStatus(204);
});

router.post("/ticker", async (req, res) => {
    await new GlobalController().updateTicker(req.body);
    res.sendStatus(204);
});

router.get("/config", async (req, res) => {
    res.json(await new GlobalController().getConfig());
});

export default router;
