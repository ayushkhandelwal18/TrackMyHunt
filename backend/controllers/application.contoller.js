const applicationService = require("../services/application.service");

exports.create = async (req, res) => {
  try {
    const app = await applicationService.createApplication(
      req.user._id,
      req.body
    );
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const apps = await applicationService.getApplications(req.user._id);
    res.json(apps);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const app = await applicationService.updateApplication(
      req.params.id,
      req.user._id,
      req.body
    );
    res.json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await applicationService.deleteApplication(
      req.params.id,
      req.user._id
    );
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
