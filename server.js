// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // import routes
// import authRoutes from "./routes/auth.js";
// import postRoutes from "./routes/posts.js";

// dotenv.config();

// // 1) Create app
// const app = express();

// // 2) Middlewares
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5174",   // Vite dev server
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // 3) Connect DB
// connectDB();

// // 4) Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);

// // 5) Test route
// app.get("/", (req, res) => {
//   res.send("Backend running!");
// });

// // 6) Listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => res.send("Backend running!"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
