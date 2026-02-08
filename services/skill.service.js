const Skill = require("../models/skill.model");

exports.createSkill = async (userId, data) => {
    return await Skill.create({ ...data, user: userId });
};

exports.getSkills = async (userId) => {
    return await Skill.find({ user: userId }).sort({ createdAt: -1 });
};

exports.updateSkill = async (id, userId, data) => {
    const skill = await Skill.findOne({ _id: id, user: userId });
    if (!skill) throw new Error("Skill not found");

    Object.assign(skill, data);
    return await skill.save();
};

exports.deleteSkill = async (id, userId) => {
    const skill = await Skill.findOneAndDelete({ _id: id, user: userId });
    if (!skill) throw new Error("Skill not found");
    return skill;
};
