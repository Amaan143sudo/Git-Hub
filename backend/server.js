// 1. Sirf ek baar load karein
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth-router");
const contactRoute = require("./routes/contact-router");
const adminRoute = require("./routes/admin-router");
const eventRoute = require("./routes/event-router");

const app = express();

// 🟢 Dynamic CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// 🟢 Public folder access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🟢 Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute);
app.use("/api/events", eventRoute);

// 🟢 Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 8000;

// 🟢 Server Start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at port: ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();