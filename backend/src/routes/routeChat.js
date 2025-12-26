import express from "express"
import { protectRoute } from "../middleware/protectedRoute.js"
import { tokenGenerater } from "../controllers/chatController.js"

const router = new express.Router()

router.get("/token",protectRoute,tokenGenerater)

export default router