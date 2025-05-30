import express from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectedRoute } from "../utils/middleware.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessages);

router.post("/send/:id", protectedRoute, sendMessage);

export default router;
