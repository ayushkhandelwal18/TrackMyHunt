const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Please provide a title for your resume"],
        trim: true,
    },
    link: {
        type: String,
        required: [true, "Please provide a link to your resume"],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Resume", resumeSchema);
