const opportunityService = require("../services/opportunity.service");

exports.create = async (req, res) => {
    try {
        const opportunity = await opportunityService.createOpportunity(
            req.user._id,
            req.body
        );
        res.status(201).json(opportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const opportunities = await opportunityService.getOpportunities(req.user._id);
        res.json(opportunities);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const opportunity = await opportunityService.updateOpportunity(
            req.params.id,
            req.user._id,
            req.body
        );
        res.json(opportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await opportunityService.deleteOpportunity(
            req.params.id,
            req.user._id
        );
        res.json({ message: "Opportunity deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
