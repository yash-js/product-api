import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateRegisterUser } from "../middleware/validation.js";
const router = express.Router();

router.post("/register", validateRegisterUser, register);

router.post("/login", validateRegisterUser, login);

export default router;
