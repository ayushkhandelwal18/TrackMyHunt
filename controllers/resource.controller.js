const resourceService = require("../services/resource.service");

exports.create = async (req, res) => {
    try {
        const resource = await resourceService.createResource(req.user._id, req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const resources = await resourceService.getResources(req.user._id);
        res.json(resources);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const resource = await resourceService.updateResource(
            req.params.id,
            req.user._id,
            req.body
        );
        res.json(resource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await resourceService.deleteResource(req.params.id, req.user._id);
        res.json({ message: "Resource deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
