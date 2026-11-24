import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import songRoutes from "./Routes/songRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables");
  }
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("Mongo DB Successfully Connected 😘");
};

// Wait for MongoDB connection before running any route
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.log("Error..... 😒", err.message);
    res.status(500).json({ error: "DB Connection Failed: " + err.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ status: "Remexo Backend API is running 🎵" });
});

app.use("/api", songRoutes);

// Only run app.listen() on your local PC (Vercel ignores this and uses export default app)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
