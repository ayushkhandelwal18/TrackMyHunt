const Note = require("../models/note.model");

exports.createNote = async (userId, data) => {
    return await Note.create({ ...data, user: userId });
};

exports.getNotes = async (userId) => {
    return await Note.find({ user: userId }).sort({ date: -1 });
};

exports.updateNote = async (id, userId, data) => {
    const note = await Note.findOne({ _id: id, user: userId });
    if (!note) throw new Error("Note not found");

    Object.assign(note, data);
    return await note.save();
};

exports.deleteNote = async (id, userId) => {
    const note = await Note.findOneAndDelete({ _id: id, user: userId });
    if (!note) throw new Error("Note not found");
    return note;
};
