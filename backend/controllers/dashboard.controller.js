const dashboardService = require("../services/dashboard.service");

exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await dashboardService.getSummary(req.user._id);
        res.json(stats);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
