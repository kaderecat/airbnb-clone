import { Router } from "express";
import { registerFn } from "../controllers/authController";
import { loginFn } from "../controllers/authController";
import { logoutFn } from "../controllers/authController";

const router = Router();

router.post("/register", registerFn);
router.post("/login", loginFn);
router.post("/logout", logoutFn);

export default router;
