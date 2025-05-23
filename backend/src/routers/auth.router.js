import express from "express";
import { checkAuth, logout, signin, signup, update_profile } from "../controllers/auth.controllers.js";
import { protectedRoute } from "../utils/middleware.js";

const router =express.Router();

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/logout", logout)

router.get("/check", protectedRoute,  checkAuth);
router.put("/update-profile", protectedRoute,  update_profile);



export default router;
