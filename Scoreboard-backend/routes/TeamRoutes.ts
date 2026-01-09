import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { TeamControllers } from "../controllers/TeamController";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("logo"), (req: express.Request, res: express.Response) => {
  console.log("Upload request received");
  console.log("File:", req.file);
  console.log("Body:", req.body);

  if (!req.file) {
    console.error("No file in request");
    return res.status(400).json({ message: "No file uploaded." });
  }

  const logoUrl = `/uploads/${req.file.filename}`;
  console.log("Upload successful:", logoUrl);
  res.json({ logoUrl });
});

router.get("/", async (req, res, next) => {
  try {
    res.json(await new TeamControllers().getAllTeams());
  } catch (error) {
    next(error);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    res.json(await new TeamControllers().getTeamByName(req.params.name));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await new TeamControllers().addTeam(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json(await new TeamControllers().deleteTeam(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.patch("/:name/:medal", async (req, res, next) => {
  try {
    await new TeamControllers().addMedal(req.params.medal, req.params.name);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    res.json(await new TeamControllers().updateTeam(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});

export default router;
