const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: String,
    role: String,
    type: String,
    skills: String,
    status: String,
    link: String,
    date: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
