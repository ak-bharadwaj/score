import * as jwt from "jsonwebtoken";
import express from "express";

import AuthenticatedRequest from "../requests/AuthenticatedRequest";
import ScheduleRoutes from "./ScheduleRoutes";
import TeamRoutes from "./TeamRoutes";
import { User } from "../types/User";
import { UserRole } from "../types/UserRole";
import { AdminController } from "../controllers/AdminController";

const router = express.Router();

router.use((req: AuthenticatedRequest, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(401);
  const [type, token] = req.headers.authorization.split(" ");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
    if (error) return res.sendStatus(403);
    user = user as User;
    delete user?.iat;
    delete user?.exp;
    if (user.role !== UserRole.ADMIN) res.sendStatus(403);
    if (!!user) req.user = user as User;
    next();
  });
});

router.use((error: Error, _: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(error);
  res.sendStatus(500);
});

router.get("/", (_, res) => {
  res.send("Hello world from Admin");
});

router.use("/schedule", ScheduleRoutes);
router.use("/teams", TeamRoutes);

router.get("/users", async (req: AuthenticatedRequest, res) => {
  const adminController = new AdminController();
  res.json(await adminController.getUsers());
});

router.delete("/user", async (req: AuthenticatedRequest, res) => {
  const adminController = new AdminController();
  adminController.deleteUser(req.body);
  res.sendStatus(204);
});

router.post("/createUserWithUsernameAndPassword", async (req, res) => {
  try {
    const adminController = new AdminController();
    res.json(await adminController.createUserWithUsernameAndPassword(req.body));
  } catch (error: any) {
    res.status(403);
    res.send({ message: error.message });
  }
});

router.get("/logs", async (req, res) => {
  res.json(await new AdminController().getScoreChangeLogs());
});

export default router;
