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

// app.get("/init-db", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash("k12-admin_102026", 10);
//     await db.query(
//       "insert into admin_cred (email, password) values ($1, $2, $3)",
//       ["k12_Admin3010@gmail.com", hashedPassword],
//     );

//     res.status(200).json({ message: "Table created successfully" });
//   } catch (error) {
//     console.log("Full error message: ", error);
//     console.log("Particular error message: ", error.message);
//     res.status(500).json({ message: "Something went wrong, server error." });
//   }
// });

app.use("/api/inquiry", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
