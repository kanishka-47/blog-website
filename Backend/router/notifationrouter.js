import express from "express";
import Notification from "../model/notifinationschema.js";
import { isuserauthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/getallnotificationsofloginuser", isuserauthenticated, async (req, res) => {
    try {
        const user = req.user;
        const userId=user._id;
       // console.log("Fetching notifications for user:", userId);
        const notifications = await Notification.find({ receiver: userId })
            .populate("sender", "firstname lastname email")
            .populate("blog", "title")
            .sort({ createdAt: -1 });

          //  console.log("Fetched notifications:", notifications);

        res.status(200).json({ success: true, notifications });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.put("/notifications/:id/read", isuserauthenticated, async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
        res.status(200).json({ success: true, message: "Notification marked as read" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;
