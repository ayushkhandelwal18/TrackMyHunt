const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
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
            ],
        },
        openingMonth: {
            type: String, // e.g., "August"
        },
        openingYear: {
            type: Number, // e.g., 2026
        },
        skills: {
            type: String,
        },
        link: {
            type: String,
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
