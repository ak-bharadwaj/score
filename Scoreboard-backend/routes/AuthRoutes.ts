import express from "express";

import { AuthController } from "../controllers/AuthController";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello world from auth");
});

router.post("/loginWithUsernameAndPassword", async (req, res) => {
  const authController = new AuthController();
  try {
    const data = await authController.loginWithUsernameAndPassword(req.body);
    res.json(data);
  } catch (error: any) {
    res.status(403);
    res.send({ message: error.message });
  }
});

router.post("/accessToken", async (req, res) => {
  const authController = new AuthController();

  try {
    res.json(await authController.accessToken(req.body));
  } catch (err: any) {
    res.sendStatus(403);
  }
});

router.delete("/logout", (req, res) => {
  const authController = new AuthController();
  authController.logout(req.body);
  res.sendStatus(204);
});

export default router;
