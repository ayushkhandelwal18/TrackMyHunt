const service = require("../services/application.service");

exports.createApplication = async (req, res) => {
  try {
    const app = await service.createApp(req.body, req.user._id);
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const apps = await service.getApps(req.user._id);
    res.json(apps);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
