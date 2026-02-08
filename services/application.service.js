const Application = require("../models/application.models");

exports.createApplication = async (userId, data) => {
  return await Application.create({
    ...data,
    user: userId,
  });
};

exports.getApplications = async (userId) => {
  return await Application.find({ user: userId }).sort({ appliedDate: -1 });
};

exports.updateApplication = async (appId, userId, data) => {
  const app = await Application.findOneAndUpdate(
    { _id: appId, user: userId },
    data,
    { new: true }
  );

  if (!app) throw new Error("Application not found");
  return app;
};

exports.deleteApplication = async (appId, userId) => {
  const app = await Application.findOneAndDelete({
    _id: appId,
    user: userId,
  });

  if (!app) throw new Error("Application not found");
  return true;
};
