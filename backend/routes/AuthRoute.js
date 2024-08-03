import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { Login, Me } from "../controllers/authController.js";
const router = express.Router();



router.post("/login", Login );
router.get('/me', authenticate, Me);

export default router;
