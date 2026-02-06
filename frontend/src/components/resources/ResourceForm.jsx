import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

function ResourceForm({ isOpen, onClose, onSubmit, initialData = null, loading }) {
    const [formData, setFormData] = useState({
        title: "",
        type: "YouTube",
        link: "",
        relatedSkills: "",
        description: "",
        status: "Saved",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: "",
                type: "YouTube",
                link: "",
                relatedSkills: "",
                description: "",
                status: "Saved",
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
            <div className="bg-[#1e293b] w-full max-w-xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-[#0f172a]">
                    <h2 className="text-xl font-bold text-gray-100">
                        {initialData ? "Edit Resource" : "Add New Resource"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <form id="resource-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Striver DSA Sheet"
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Type & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                                >
                                    <option value="YouTube">YouTube</option>
                                    <option value="Blog">Blog</option>
                                    <option value="Article">Article</option>
                                    <option value="Course">Course</option>
                                    <option value="Website">Website</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                                >
                                    <option value="Saved">Saved</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        {/* Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Link (URL) *</label>
                            <input
                                type="url"
                                name="link"
                                required
                                value={formData.link}
                                onChange={handleChange}
                                placeholder="https://youtube.com/..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Related Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Related Skills</label>
                            <input
                                type="text"
                                name="relatedSkills"
                                value={formData.relatedSkills}
                                onChange={handleChange}
                                placeholder="e.g. DSA, React, DBMS"
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description / Notes</label>
                            <textarea
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Why is this useful?"
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none"
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
                        form="resource-form"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? "Update Resource" : "Save Resource"}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ResourceForm;
