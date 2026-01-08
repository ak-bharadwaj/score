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

router.post("/featured-event", async (req, res) => {
    try {
        await new GlobalController().updateFeaturedEvent(req.body);
        res.sendStatus(204);
    } catch (e: any) {
        console.error("Featured Event Error:", e);
        res.status(500).send(e.toString());
    }
});

router.get("/config", async (req, res) => {
    res.json(await new GlobalController().getConfig());
});

export default router;
