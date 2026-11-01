import express from "express"
import { getCurrentAdmin, login, logout } from "../controllers/authController.js"
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router()

router.post("/login", login)
router.get("/me", verifyAdmin, getCurrentAdmin);
router.post("/logout", logout)

export default router