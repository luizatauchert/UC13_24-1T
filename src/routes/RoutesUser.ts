import { Router } from "express";
import { registerUser, loginUser } from "../controller/UserController";

const router = Router();
router.post("/user", registerUser);
router.post("/users/login", loginUser);
export default router;
