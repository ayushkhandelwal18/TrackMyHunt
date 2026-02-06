//Handles application configuration, such as middleware, route registration, etc.
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRoutes = require("./routes/auth.routes");
const applicationRoutes = require("./routes/application.routes");
const opportunityRoutes = require("./routes/opportunity.routes");
const skillRoutes = require("./routes/skill.routes");

app.use(cors());
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/skills", skillRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app