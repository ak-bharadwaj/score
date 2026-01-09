import express from "express";
import { GlobalController } from "../controllers/GlobalController";

const router = express.Router();

router.post("/broadcast", async (req, res, next) => {
    try {
        await new GlobalController().broadcast(req.body);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.post("/ticker", async (req, res, next) => {
    try {
        await new GlobalController().updateTicker(req.body);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.post("/featured-event", async (req, res, next) => {
    try {
        await new GlobalController().updateFeaturedEvent(req.body);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.get("/config", async (req, res, next) => {
    try {
        res.json(await new GlobalController().getConfig());
    } catch (error) {
        next(error);
    }
});

export default router;
