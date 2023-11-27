/* eslint-disable prettier/prettier */
import passport from "passport";
import { Router } from "express";
import TaskController from "../controlles/TaskControllers";

const router = Router();

router.get("/", TaskController.fetchAllTasks);
router.post("/", TaskController.addNewTask);
router.patch("/", TaskController.UpdateTask);

module.exports = { router, passport };
