const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Application = require("../models/application.models");
const Opportunity = require("../models/opportunity.model");
const Skill = require("../models/skill.model");
const Resource = require("../models/resource.model");
const Note = require("../models/note.model");
const Resume = require("../models/resume.model");

exports.updateProfile = async (userId, { name }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (name) user.name = name;
    await user.save();

    return { id: user._id, name: user.name, email: user.email };
};

exports.changePassword = async (userId, { currentPassword, newPassword }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (!user.password) throw new Error("User authenticated via Google. Cannot change password.");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error("Incorrect current password");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: "Password updated successfully" };
};

exports.deleteAccount = async (userId, { password }) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // If user has a password (not Google-only), verify it
    if (user.password) {
        if (!password) throw new Error("Password required to delete account");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Incorrect password");
    }

    // Cascade delete
    await Promise.all([
        Application.deleteMany({ userId }),
        Opportunity.deleteMany({ userId }),
        Skill.deleteMany({ userId }),
        Resource.deleteMany({ userId }),
        Note.deleteMany({ userId }),
        Resume.deleteMany({ userId }),
        User.findByIdAndDelete(userId),
    ]);

    return { message: "Account deleted successfully" };
};
