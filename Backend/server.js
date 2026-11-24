import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import songRoutes from "./Routes/songRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.use(cors());
app.use(express.json());
app.use("/api", songRoutes)

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Music_App"
mongoose.connect(MONGO_URI)
    .then(() => console.log("Mongo DB Successfully Connected 😘"))
    .catch((err) => console.log("Error..... 😒", err.message))