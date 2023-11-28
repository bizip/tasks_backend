/* eslint-disable prettier/prettier */
import passport from "passport";
import { Router } from "express";
import AuthController from "../controlles/authControllers";
const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.signupWithEmailAndPassword);
router.patch("/reset", AuthController.resetPassword);


module.exports = { router, passport };
