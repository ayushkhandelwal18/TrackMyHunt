import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

function ApplicationForm({ isOpen, onClose, onSubmit, initialData = null, loading }) {
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        type: "Full-Time",
        status: "Applied",
        applicationLink: "",
        skills: "",
        notes: "",
        appliedDate: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                appliedDate: initialData.appliedDate ? initialData.appliedDate.split("T")[0] : new Date().toISOString().split("T")[0],
            });
        } else {
            // Reset form for new entry
            setFormData({
                company: "",
                role: "",
                type: "Full-Time",
                status: "Applied",
                applicationLink: "",
                skills: "",
                notes: "",
                appliedDate: new Date().toISOString().split("T")[0],
            })
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

                
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-[#0f172a]">
                    <h2 className="text-xl font-bold text-gray-100">
                        {initialData ? "Edit Application" : "Add New Application"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <form id="app-form" onSubmit={handleSubmit} className="space-y-6">

                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Company Name *</label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. Google, Amazon"
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Role / Position *</label>
                                <input
                                    type="text"
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g. Frontend Engineer"
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                                />
                            </div>
                        </div>

                        
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
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Intern + Offer">Intern + Offer</option>
                                    <option value="Other">Other</option>
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
                                    <option value="Applied">Applied</option>
                                    <option value="Resume Shortlisted">Resume Shortlisted</option>
                                    <option value="OA Done">OA Done</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                    <option value="Interview Done">Interview Done</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Applied Date</label>
                                <input
                                    type="date"
                                    name="appliedDate"
                                    required
                                    value={formData.appliedDate}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-amber-500 transition"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Application Link</label>
                            <input
                                type="url"
                                name="applicationLink"
                                value={formData.applicationLink}
                                onChange={handleChange}
                                placeholder="https://workflow.com/..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                            <textarea
                                name="notes"
                                rows="3"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Any additional details..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none"
                            ></textarea>
                        </div>

                    </form>
                </div>

                
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
                        form="app-form"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        <span>{initialData ? "Update Application" : "Save Application"}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ApplicationForm;
