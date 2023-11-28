/* eslint-disable prettier/prettier */
import passport from "passport";
import { Router } from "express";
import ProjectController from "../controlles/projectController";
import protect from '../../middlewares';

const router = Router();

router.get("/",protect, ProjectController.fetchAllProjects);
router.post("/",protect, ProjectController.addNewProject);

module.exports = { router, passport };
