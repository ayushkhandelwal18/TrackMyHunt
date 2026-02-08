const userService = require("../services/user.service");

exports.updateProfile = async (req, res) => {
    try {
        const result = await userService.updateProfile(req.user.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const result = await userService.changePassword(req.user.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const result = await userService.deleteAccount(req.user.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
