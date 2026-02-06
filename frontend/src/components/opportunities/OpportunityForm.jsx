import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

function OpportunityForm({ isOpen, onClose, onSubmit, initialData = null, loading }) {
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        type: "Full-time",
        openingMonth: "January",
        openingYear: new Date().getFullYear(),
        skills: "",
        link: "",
        notes: "",
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = [2024, 2025, 2026, 2027];

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                company: "",
                role: "",
                type: "Full-time",
                openingMonth: "January",
                openingYear: new Date().getFullYear(),
                skills: "",
                link: "",
                notes: "",
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
            <div className="bg-[#1e293b] w-full max-w-2xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-[#0f172a]">
                    <h2 className="text-xl font-bold text-gray-100">
                        {initialData ? "Edit Opportunity" : "Add New Opportunity"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <form id="opp-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Row 1: Company & Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Company Name *</label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. Microsoft"
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Job Role *</label>
                                <input
                                    type="text"
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g. SDE, Analyst"
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                                />
                            </div>
                        </div>

                        {/* Row 2: Type, Month, Year */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                                >
                                    <option value="Intern">Intern</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Opening Month</label>
                                <select
                                    name="openingMonth"
                                    value={formData.openingMonth}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                                >
                                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Year</label>
                                <select
                                    name="openingYear"
                                    value={formData.openingYear}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                                >
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Link (Optional)</label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                placeholder="https://careers.google.com/..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Skills Required</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="Java, Python, System Design..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                            <textarea
                                name="notes"
                                rows="3"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Referral info, preparation topics..."
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
                        form="opp-form"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? "Update Opportunity" : "Save Opportunity"}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default OpportunityForm;
