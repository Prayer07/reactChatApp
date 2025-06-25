import express from "express";
import User from "../models/user.model.js";
import {signup, login, chat } from "../controllers/user.controller.js";

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

// router.get("/chat/:id", chat)

export default router