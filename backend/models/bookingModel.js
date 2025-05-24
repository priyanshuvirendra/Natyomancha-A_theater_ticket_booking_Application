import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        show: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Show",
            required: true,
        },
        seats: {
            type: Array,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        paymentId: {
            type: String,
            required: true,
        },
        signatureId: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
