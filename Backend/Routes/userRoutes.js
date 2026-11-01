import express from "express";
import { fetchDashboardData, storeInquiry } from "../controllers/userController.js";
import { userInfoSchema, validate } from "../middleware/zodMiddleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/storeInquiry", validate(userInfoSchema), storeInquiry);
router.get("/dashboard", verifyAdmin, fetchDashboardData);

export default router;
