import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    requireAuth({ signInUrl: '/sign-in' }),
    async (req, res, next) => {
        try {
            const auth = (typeof req.auth === "function") ? req.auth() : req.auth;
            
            const clerkId = auth?.userId;

            if (!clerkId) {
                console.error('protectRoute: no clerkId on auth; requireAuth may not have attached auth');
                return res.status(401).json({ message: "Unauthorized - token (No clerk Id)" });
            }

            const user = await User.findOne({ clerkId });

            if (!user) return res.status(404).json({ message: "User not found" });
            req.user = user;
            return next();

        } catch (e) {
            console.error("error in protect_route", e);
            return res.status(500).json({
                success: false,
                message: "User authentication failure"
            });

        }
    }
]