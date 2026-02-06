import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { getNotes, createNote, updateNote, deleteNote } from "../services/api";
import NoteCard from "../components/notes/NoteCard";
import NoteForm from "../components/notes/NoteForm";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddClick = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      if (editingNote) {
        const updated = await updateNote(editingNote._id, formData);
        setNotes(notes.map(n => n._id === updated._id ? updated : n));
      } else {
        const newNote = await createNote(formData);
        setNotes([newNote, ...notes]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Brain Dump</h1>
          <p className="text-gray-400">Capture your thoughts, learnings, and experiences.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-amber-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-400 transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus size={20} /> Add Note
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-amber-500" size={40} />
        </div>
      ) : error ? (
        <div className="text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
          Error: {error}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
          <p className="text-gray-500 text-lg mb-4">No notes created yet.</p>
          <button onClick={handleAddClick} className="text-amber-500 font-medium hover:underline">Write your first note</button>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <NoteForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingNote}
        loading={submitLoading}
      />

    </div>
  );
}

export default Notes;
