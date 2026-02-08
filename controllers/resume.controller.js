const Resume = require("../models/resume.model");

// Add a new resume link
exports.addResume = async (req, res) => {
    try {
        const { title, link, description } = req.body;

        if (!title || !link) {
            return res.status(400).json({ message: "Please provide both title and link" });
        }

        const resume = await Resume.create({
            user: req.user.id,
            title,
            link,
            description,
        });

        res.status(201).json({
            success: true,
            resume,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a resume
exports.updateResume = async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Ensure user owns the resume
        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to update this resume" });
        }

        resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            resume,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all resumes for user
exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            resumes,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a resume
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

       
        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to delete this resume" });
        }

        await resume.deleteOne();

        res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
