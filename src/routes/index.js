import { Router } from "express";
import { welcomeController } from "../controllers";
const router = Router();

router.get("/", welcomeController);

export default router;
