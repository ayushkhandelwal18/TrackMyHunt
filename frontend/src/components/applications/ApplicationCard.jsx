import { Trash2, Edit, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";

function ApplicationCard({ app, onEdit, onDelete }) {
    const statusColors = {
        "Applied": "text-blue-400 bg-blue-500/10",
        "Resume Shortlisted": "text-purple-400 bg-purple-500/10",
        "OA Done": "text-cyan-400 bg-cyan-500/10",
        "Interview Scheduled": "text-yellow-400 bg-yellow-500/10",
        "Interview Done": "text-orange-400 bg-orange-500/10",
        "Rejected": "text-red-400 bg-red-500/10",
        "Other": "text-gray-400 bg-gray-500/10",
    };

    return (
        <div className="bg-[#1e293b] border border-gray-700/50 rounded-xl p-5 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-amber-400 transition">{app.company}</h3>
                    <p className="text-gray-400 font-medium">{app.role}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status] || "text-gray-400 bg-gray-500/10"}`}>
                    {app.status}
                </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-300 border border-gray-700">{app.type}</span>
                    {app.applicationLink && (
                        <a href={app.applicationLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-amber-500 hover:underline">
                            <ExternalLink size={12} /> Link
                        </a>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                </div>
                {app.skills && (
                    <div className="truncate">
                        <span className="font-medium text-gray-400">Skills: </span> {app.skills}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
                <button
                    onClick={() => onEdit(app)}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition bg-gray-800/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg"
                >
                    <Edit size={14} /> Edit
                </button>
                <button
                    onClick={() => onDelete(app._id)}
                    className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg"
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>

        </div>
    );
}

export default ApplicationCard;
