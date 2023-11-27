/* eslint-disable prettier/prettier */
import passport from "passport";
import { Router } from "express";
import AuthController from "../controlles/authControllers";
import Validator  from "../../middlewares/validators/validate";
const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.signupWithEmailAndPassword);
router.get('/verify/:token', Validator.verifyEmail, AuthController.verifyEmail);

module.exports = { router, passport };
