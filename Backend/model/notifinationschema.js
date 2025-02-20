import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema(
    {
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // The user receiving the notification
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // The user who triggered the notification (e.g., the one who liked/commented)
            required: true,
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog", // The blog on which the action happened
            required: true,
        },
        type: {
            type: String,
            enum: ["like", "comment"], // Notification type
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false, // To track if the notification is read
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
