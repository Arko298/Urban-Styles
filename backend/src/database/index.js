import mongoose from "mongoose";
import DB_NAME from "../constants.js";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("MongoDB connected");
        console.log(`Connected to ${connectionInstance.connection.host}`);
        console.log("MONGO_URI:", process.env.MONGODB_URI);
        console.log("DB_NAME:", DB_NAME);
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
}

export default connectDB;
