import express from "express"
import { protectRoute } from "../middleware/protectedRoute.js"
import { createSession, endSession, getActiveSession, getRecentSession, getSessionbyId, joinSession } from "../controllers/sessionController.js"

const router = express.Router()

router.post("/",protectRoute,createSession)
router.get("/active",protectRoute,getActiveSession)
router.get("/my-recent-session",protectRoute,getRecentSession)

router.get("/:id",protectRoute,getSessionbyId)
router.post("/:id/join",protectRoute,joinSession)
router.post("/:id/end",protectRoute,endSession)

export default router