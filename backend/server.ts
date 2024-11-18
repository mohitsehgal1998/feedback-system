import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./app/routes/auth.ts";
import feedback from "./app/routes/user.ts";
import teamRoutes from "./app/routes/team.ts"
import adminRoutes from "./app/routes/admin.ts";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig.js";

config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Swagger UI setup - serve API documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI documentation route

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", feedback);
app.use("/api/admin", adminRoutes);
app.use("/api/team", teamRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ success: false, error: err?.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
