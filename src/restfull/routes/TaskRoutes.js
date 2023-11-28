/* eslint-disable prettier/prettier */
import passport from "passport";
import { Router } from "express";
import TaskController from "../controlles/TaskControllers";
import protect from "../../middlewares";

const router = Router();

router.get("/",protect, TaskController.fetchAllTasks);
router.post("/",protect, TaskController.addNewTask);
router.patch("/",protect, TaskController.UpdateTask);
router.delete("/:id",protect, TaskController.DeleteTask);

module.exports = { router, passport };
