const noteService = require("../services/note.service");

exports.create = async (req, res) => {
    try {
        const note = await noteService.createNote(req.user._id, req.body);
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const notes = await noteService.getNotes(req.user._id);
        res.json(notes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const note = await noteService.updateNote(
            req.params.id,
            req.user._id,
            req.body
        );
        res.json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await noteService.deleteNote(req.params.id, req.user._id);
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
