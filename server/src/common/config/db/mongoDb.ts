// src/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, { dbName: "edumizeWeb" });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
