import { Trash2, Edit, ExternalLink, CalendarClock, Briefcase } from "lucide-react";

function OpportunityCard({ item, onEdit, onDelete }) {
    return (
        <div className="bg-[#1e293b] border border-gray-700/50 rounded-xl p-5 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group">

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-amber-400 transition">{item.company}</h3>
                    <p className="text-gray-400 font-medium">{item.role}</p>
                </div>
                <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
                    {item.type}
                </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <CalendarClock size={16} className="text-gray-500" />
                    <span>Opening: <span className="text-gray-300 font-medium">{item.openingMonth} {item.openingYear}</span></span>
                </div>

                {item.skills && (
                    <div className="flex items-start gap-2">
                        <Briefcase size={16} className="text-gray-500 mt-0.5" />
                        <span className="line-clamp-2">{item.skills}</span>
                    </div>
                )}

                {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-amber-500 hover:underline w-fit">
                        <ExternalLink size={14} /> Apply Link
                    </a>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
                <button
                    onClick={() => onEdit(item)}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition bg-gray-800/50 hover:bg-gray-700 px-3 py-1.5 rounded-lg"
                >
                    <Edit size={14} /> Edit
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg"
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>

        </div>
    );
}

export default OpportunityCard;
