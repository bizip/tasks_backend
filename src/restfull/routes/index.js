import { Router } from "express";
import { router as authRouter } from "./authRouters";
import { router as taskRouter } from "./TaskRoutes";

const API_VERSION = process.env.API_VERSION || "v1";
const url = `/api/${API_VERSION}`;
const router = Router();

router.use(`${url}/auth`, authRouter);
router.use(`${url}/task`, taskRouter);

router.all(`${url}/`, (req, res) => {
  return res.status(200).json({ message: "Welcome to nodeJs backend!" });
});
router.use("*", (req, res) => {
  res.status(404).json({ status: 404, message: "This endpoint is not exist" });
});

export default router;
