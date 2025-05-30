import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected succesfully");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
