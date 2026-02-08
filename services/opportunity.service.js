const Opportunity = require("../models/opportunity.model");

exports.createOpportunity = async (userId, data) => {
    return await Opportunity.create({ ...data, user: userId });
};

exports.getOpportunities = async (userId) => {
    return await Opportunity.find({ user: userId }).sort({ createdAt: -1 });
};

exports.updateOpportunity = async (id, userId, data) => {
    const opportunity = await Opportunity.findOne({ _id: id, user: userId });
    if (!opportunity) throw new Error("Opportunity not found");

    Object.assign(opportunity, data);
    return await opportunity.save();
};

exports.deleteOpportunity = async (id, userId) => {
    const opportunity = await Opportunity.findOneAndDelete({ _id: id, user: userId });
    if (!opportunity) throw new Error("Opportunity not found");
    return opportunity;
};
