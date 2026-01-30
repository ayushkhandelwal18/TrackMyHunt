const Application = require("../models/application.models");

exports.createApp = async (data, userId) => {
  return Application.create({ ...data, user: userId });
};

exports.getApps = async (userId) => {
  return Application.find({ user: userId }).sort({ createdAt: -1 });
};
