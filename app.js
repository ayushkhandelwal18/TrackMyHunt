//Handles application configuration, such as middleware, route registration, etc.
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRoutes = require("./routes/auth.routes");
const applicationRoutes = require("./routes/application.routes");
const opportunityRoutes = require("./routes/opportunity.routes");
const skillRoutes = require("./routes/skill.routes");
const resourceRoutes = require("./routes/resource.routes");
const noteRoutes = require("./routes/note.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const resumeRoutes = require("./routes/resume.routes");

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://trackmyhunt.vercel.app",
  "http://localhost:5173", // Common Vite development port
  "http://localhost:3000"
].filter(Boolean); // Remove undefined/null if CLIENT_URL is not set

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") || // Allow Vercel previews
      origin.includes("localhost");

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`[CORS ERROR] Origin ${origin} not allowed`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/applications", applicationRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resumes", resumeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running successfully", timestamp: new Date().toISOString() });
});

module.exports = app
