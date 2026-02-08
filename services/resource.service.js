const Resource = require("../models/resource.model");

exports.createResource = async (userId, data) => {
    return await Resource.create({ ...data, user: userId });
};

exports.getResources = async (userId) => {
    return await Resource.find({ user: userId }).sort({ createdAt: -1 });
};

exports.updateResource = async (id, userId, data) => {
    const resource = await Resource.findOne({ _id: id, user: userId });
    if (!resource) throw new Error("Resource not found");

    Object.assign(resource, data);
    return await resource.save();
};

exports.deleteResource = async (id, userId) => {
    const resource = await Resource.findOneAndDelete({ _id: id, user: userId });
    if (!resource) throw new Error("Resource not found");
    return resource;
};
