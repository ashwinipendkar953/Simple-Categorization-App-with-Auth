// src/index.js
const express = require("express");
const cors = require("cors");
const getCategoriesController = require("./controllers/getCategoriesController");
require("dotenv").config();

const connectDB = require("./config/db");
const {
  registerController,
  loginController,
  verifyOtpController,
} = require("./controllers/authController");
const authMiddleware = require("./middleware/authMiddleware");
const saveUserInterestsController = require("./controllers/saveUserInterestsController");

const app = express();
app.use(express.json());

connectDB();

const frontendUrl = (
  process.env.FRONTEND_URL || "http://localhost:5173"
).trim();

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.post("/api/verify-otp", verifyOtpController);

app.post("/api/user/register", registerController);
app.post("/api/user/login", loginController);

// Fetch Paginated Categories
app.get("/api/categories", authMiddleware, getCategoriesController);

// Store User's Selected Categories
app.post("/api/user/interests", authMiddleware, saveUserInterestsController);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
