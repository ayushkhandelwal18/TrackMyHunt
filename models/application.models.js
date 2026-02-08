const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    enum: [
  "Intern",
  "Full-Time",
  "Remote",
  "Freelance",
  "Intern + Offer",
  "Other",
]
    },
    skills: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Applied",
        "Resume Shortlisted",
        "OA Done",
        "Interview Scheduled",
        "Interview Done",
        "Rejected",
        "Other",
      ],
    },
    applicationLink: {
      type: String,
    },
    notes: {
      type: String,
    },
    appliedDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
