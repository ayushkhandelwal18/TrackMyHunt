const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String, 
            required: true,
            enum: ["YouTube", "Blog", "Article", "Course", "Website"],
        },
        link: {
            type: String,
            required: true,
            trim: true,
        },
        relatedSkills: {
            type: String, 
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ["Saved", "In progress", "Completed"],
            default: "Saved",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
