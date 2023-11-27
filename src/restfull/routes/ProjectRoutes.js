/* eslint-disable prettier/prettier */
import passport from "passport";
import { Router } from "express";
import ProjectController from "../controlles/projectController";

const router = Router();

router.get("/", ProjectController.fetchAllProjects);
router.post("/", ProjectController.addNewProject);

module.exports = { router, passport };
