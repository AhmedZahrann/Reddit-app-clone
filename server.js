import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// import routes
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

// 1) Create app
const app = express();

// 2) Middlewares
app.use(express.json());
app.use(cors());

// 3) Connect DB
connectDB();

// 4) Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 5) Test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// 6) Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
