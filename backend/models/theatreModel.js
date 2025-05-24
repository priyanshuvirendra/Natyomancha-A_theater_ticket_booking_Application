import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Theatre", theatreSchema);
