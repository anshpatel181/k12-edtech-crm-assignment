import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import cookieParser from "cookie-parser"

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use("/api/inquiry", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
