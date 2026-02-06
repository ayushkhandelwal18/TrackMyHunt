import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

function SkillForm({ isOpen, onClose, onSubmit, initialData = null, loading }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "Frontend",
        proficiency: "Beginner",
        target: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                category: "Frontend",
                proficiency: "Beginner",
                target: "",
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
            <div className="bg-[#1e293b] w-full max-w-lg rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-[#0f172a]">
                    <h2 className="text-xl font-bold text-gray-100">
                        {initialData ? "Edit Skill" : "Add New Skill"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <form id="skill-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Skill Name *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. React, Node.js"
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Category & Proficiency */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                                >
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Tools">Tools</option>
                                    <option value="Soft Skills">Soft Skills</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Proficiency</label>
                                <select
                                    name="proficiency"
                                    value={formData.proficiency}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        </div>

                        {/* Target / Improvement Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Target / Improvement Plan</label>
                            <textarea
                                name="target"
                                rows="3"
                                value={formData.target}
                                onChange={handleChange}
                                placeholder="e.g. Build 2 projects, Read documentation..."
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
                        form="skill-form"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? "Update Skill" : "Save Skill"}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default SkillForm;
