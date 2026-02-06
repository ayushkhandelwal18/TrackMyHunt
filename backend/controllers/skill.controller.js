const skillService = require("../services/skill.service");

exports.create = async (req, res) => {
    try {
        const skill = await skillService.createSkill(req.user._id, req.body);
        res.status(201).json(skill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const skills = await skillService.getSkills(req.user._id);
        res.json(skills);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const skill = await skillService.updateSkill(
            req.params.id,
            req.user._id,
            req.body
        );
        res.json(skill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await skillService.deleteSkill(req.params.id, req.user._id);
        res.json({ message: "Skill deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
