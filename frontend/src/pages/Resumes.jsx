import { useState, useEffect } from "react";
import { Trash2, Plus, FileText, ExternalLink, Pencil } from "lucide-react";
import { getResumes, addResume, deleteResume, updateResume } from "../services/api";

function Resumes() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ title: "", link: "", description: "" });
    const [editingId, setEditingId] = useState(null); // If not null, we are editing

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    async function fetchResumes() {
        try {
            const data = await getResumes();
            setResumes(data.resumes);
        } catch (err) {
            console.error("Failed to fetch resumes:", err);
        } finally {
            setLoading(false);
        }
    }

    function openAddModal() {
        setFormData({ title: "", link: "", description: "" });
        setEditingId(null);
        setError("");
        setShowModal(true);
    }

    function openEditModal(resume) {
        setFormData({
            title: resume.title,
            link: resume.link,
            description: resume.description || ""
        });
        setEditingId(resume._id);
        setError("");
        setShowModal(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.title || !formData.link) return;

        try {
            setSubmitting(true);
            setError("");

            if (editingId) {
                // Update existing
                await updateResume(editingId, formData);
            } else {
                // Create new
                await addResume(formData);
            }

            setShowModal(false);
            fetchResumes();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save resume");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this resume link?")) return;
        try {
            setResumes(resumes.filter((r) => r._id !== id));
            await deleteResume(id);
        } catch (err) {
            console.error("Failed to delete resume:", err);
            fetchResumes(); // Revert on failure
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-100">My Resumes</h1>
                    <p className="text-gray-400 mt-1">Manage links to your different resume versions</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-amber-500 text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-amber-400 transition"
                >
                    <Plus size={20} /> Add Resume Link
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading resumes...</div>
            ) : resumes.length === 0 ? (
                <div className="bg-[#1e293b] rounded-xl p-12 text-center border border-dashed border-gray-700">
                    <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-200 mb-2">No resumes added yet</h3>
                    <p className="text-gray-400 mb-6">Keep track of your resume links (Google Drive, Notion, etc.) here.</p>
                    <button
                        onClick={openAddModal}
                        className="text-amber-400 hover:text-amber-300 font-medium"
                    >
                        Add your first resume link
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <div key={resume._id} className="bg-[#1e293b] rounded-xl p-6 border border-gray-700/50 hover:border-amber-500/30 transition group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                                    <FileText size={24} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(resume)}
                                        className="text-gray-500 hover:text-amber-400 transition"
                                        title="Edit"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(resume._id)}
                                        className="text-gray-500 hover:text-red-400 transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-200 mb-1">{resume.title}</h3>

                            {resume.description && (
                                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{resume.description}</p>
                            )}
                            {!resume.description && (
                                <div className="flex-grow"></div>
                            )}

                            <div className="pt-4 mt-auto border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-500">
                                <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
                                <a
                                    href={resume.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 hover:underline"
                                >
                                    Open Link <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1e293b] w-full max-w-md rounded-2xl p-6 border border-gray-700 shadow-xl">
                        <h2 className="text-xl font-bold text-gray-100 mb-4">
                            {editingId ? "Edit Resume Link" : "Add Resume Link"}
                        </h2>

                        {error && (
                            <div className="mb-4 text-sm text-red-400 bg-red-500/10 p-3 rounded border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Title <span className="text-red-400">*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Developer Resume"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:border-amber-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Link URL <span className="text-red-400">*</span></label>
                                <input
                                    type="url"
                                    placeholder="https://drive.google.com/..."
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:border-amber-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                                <textarea
                                    placeholder="e.g. Use this for React.js roles"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-3 text-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                                />
                            </div>

                            <div className="flex gap-3 mt-6 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-2 rounded-lg bg-amber-500 text-black font-medium hover:bg-amber-400 transition disabled:opacity-50"
                                >
                                    {submitting ? "Saving..." : (editingId ? "Update Link" : "Add Link")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Resumes;
