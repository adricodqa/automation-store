import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Welcome a Automation Store");
});

export default router;