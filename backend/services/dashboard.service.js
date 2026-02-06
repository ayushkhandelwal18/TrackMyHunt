const Application = require("../models/application.models");
const Opportunity = require("../models/opportunity.model");
const Skill = require("../models/skill.model");

exports.getSummary = async (userId) => {
    const [
        totalApplications,
        interviewScheduled,
        rejections,
        pendingApplications,
        recentApplications,
        upcomingOpportunities,
        skillStats,
    ] = await Promise.all([
        Application.countDocuments({ user: userId }),
        Application.countDocuments({
            user: userId,
            status: { $in: ["Interview Scheduled", "Interview Done"] },
        }),
        Application.countDocuments({ user: userId, status: "Rejected" }),
        Application.countDocuments({
            user: userId,
            status: { $in: ["Applied", "Resume Shortlisted", "OA Done"] },
        }),
        Application.find({ user: userId })
            .sort({ updatedAt: -1 })
            .limit(5)
            .select("company role status updatedAt"),
        Opportunity.find({ user: userId }) // Simple logic: just get all and filter/sort in frontend or here. Let's just get next 5.
            .sort({ openingYear: 1, openingMonth: 1 }) // improved sorting needed realistically but string months make it hard. Just basic sort for now.
            .limit(5),
        Skill.aggregate([
            { $match: { user: userId } },
            { $group: { _id: "$proficiency", count: { $sum: 1 } } },
        ]),
    ]);

    return {
        counts: {
            total: totalApplications,
            interview: interviewScheduled,
            rejected: rejections,
            pending: pendingApplications
        },
        recentApplications,
        upcomingOpportunities,
        skillStats: skillStats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {})
    };
};
