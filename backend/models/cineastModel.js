import mongoose from "mongoose";

const cineastSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Cineast", cineastSchema);