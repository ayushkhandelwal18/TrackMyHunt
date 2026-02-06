const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String, // Frontend, Backend, Tools, Soft Skills
            required: true,
            default: "Other",
        },
        proficiency: {
            type: String,
            required: true,
            enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        },
        target: {
            type: String, // Notes for improvement
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
