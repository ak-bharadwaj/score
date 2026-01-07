import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/interiit-sports";
  return await mongoose.connect(MONGO_URI).then(() => console.log("Connected to DB"));
};
