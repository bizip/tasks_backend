/* eslint-disable prettier/prettier */
import { Router } from "express";
import UserControllers from "../controlles/userControllers";
import passport from "passport";
import passportLocal from "passport-local";
import { User } from "../../database/models/user.model";
import AuthController from "../controlles/authControllers";
const LocalStrategy = passportLocal.Strategy;

const router = Router();
// const { loginCallback } = AuthController;
router.get("/login", (req,res)=>{
    res.json({
        users: "Bizimungu Pascal"
    });
})
router.post("/", UserControllers.addUser);
// router.get("/", UserControllers.getAllUsers);

export default router;
