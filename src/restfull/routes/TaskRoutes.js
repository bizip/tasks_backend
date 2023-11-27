/* eslint-disable prettier/prettier */
import passport from "passport";
import { Router } from "express";
import TaskController from "../controlles/TaskControllers";

const router = Router();

router.get("/", TaskController.fetchAllTasks);
router.post("/", TaskController.addNewTask);

module.exports = { router, passport };
