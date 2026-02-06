import { Trash2, Edit, Calendar, Hash } from "lucide-react";
import { useState } from "react";

function NoteCard({ note, onEdit, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    // Truncate logic
    const contentLimit = 150;
    const isLong = note.content.length > contentLimit;
    const displayContent = expanded || !isLong ? note.content : note.content.slice(0, contentLimit) + "...";

    return (
        <div className="bg-[#1e293b] border border-gray-700/50 rounded-xl p-5 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group flex flex-col h-fit break-inside-avoid mb-6">

            {/* Header */}
            <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-amber-400 transition">{note.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar size={12} />
                    <span>{new Date(note.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {displayContent}
                </p>
                {isLong && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-amber-500 text-xs font-semibold hover:underline mt-2"
                    >
                        {expanded ? "Show Less" : "Read More"}
                    </button>
                )}
            </div>

            {/* Tags */}
            {note.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.split(",").map((tag, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">
                            <Hash size={10} className="text-gray-500" />
                            {tag.trim()}
                        </div>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
                <button
                    onClick={() => onEdit(note)}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition bg-gray-800/50 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg"
                >
                    <Edit size={14} /> Edit
                </button>
                <button
                    onClick={() => onDelete(note._id)}
                    className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1.5 rounded-lg"
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>

        </div>
    );
}

export default NoteCard;
