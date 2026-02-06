import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

function NoteForm({ isOpen, onClose, onSubmit, initialData = null, loading }) {
    const [formData, setFormData] = useState({
        title: "",
        tags: "",
        content: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: "",
                tags: "",
                content: "",
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1e293b] w-full max-w-3xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-[#0f172a]">
                    <h2 className="text-xl font-bold text-gray-100">
                        {initialData ? "Edit Note" : "Add New Note"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <form id="note-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. System Design Concepts"
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="e.g. DSA, Interview, React"
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Content *</label>
                            <textarea
                                name="content"
                                required
                                rows="10"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write your thoughts here..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none font-mono text-sm leading-relaxed"
                            ></textarea>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-700 bg-[#0f172a] flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="note-form"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? "Update Note" : "Save Note"}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default NoteForm;
