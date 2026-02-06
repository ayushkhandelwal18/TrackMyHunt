import { Trash2, Edit, ExternalLink, Bookmark, Loader, CheckCircle } from "lucide-react";

function ResourceCard({ resource, onEdit, onDelete }) {
    const statusIcons = {
        "Saved": <Bookmark size={14} className="text-blue-400" />,
        "In progress": <Loader size={14} className="text-yellow-400" />,
        "Completed": <CheckCircle size={14} className="text-green-400" />
    };

    const statusColors = {
        "Saved": "text-blue-400 bg-blue-500/10 border-blue-500/20",
        "In progress": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
        "Completed": "text-green-400 bg-green-500/10 border-green-500/20",
    };

    return (
        <div className="bg-[#1e293b] border border-gray-700/50 rounded-xl p-5 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group flex flex-col h-full">

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">{resource.type}</span>
                    <h3 className="text-lg font-bold text-gray-100 group-hover:text-amber-400 transition line-clamp-2">{resource.title}</h3>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[resource.status] || "text-gray-400 bg-gray-500/10"}`}>
                    {statusIcons[resource.status]}
                    <span>{resource.status}</span>
                </div>
            </div>

            <div className="flex-1 space-y-3">
                {resource.description && (
                    <p className="text-sm text-gray-400 line-clamp-3">
                        {resource.description}
                    </p>
                )}

                {resource.relatedSkills && (
                    <div className="flex flex-wrap gap-2">
                        {resource.relatedSkills.split(",").map((skill, idx) => (
                            <span key={idx} className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-700">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-700/50">
                <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-amber-500 hover:underline font-medium"
                >
                    <ExternalLink size={14} /> Open Link
                </a>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(resource)}
                        className="text-gray-400 hover:text-white transition p-1.5 hover:bg-gray-800 rounded-lg"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(resource._id)}
                        className="text-red-400 hover:text-red-300 transition p-1.5 hover:bg-red-500/10 rounded-lg"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ResourceCard;
