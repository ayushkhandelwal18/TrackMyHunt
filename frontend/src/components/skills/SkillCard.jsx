import { Trash2, Edit, Trophy, Target } from "lucide-react";

function SkillCard({ skill, onEdit, onDelete }) {
    const proficiencyColors = {
        "Beginner": "text-blue-400 bg-blue-500/10 border-blue-500/20",
        "Intermediate": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
        "Advanced": "text-orange-400 bg-orange-500/10 border-orange-500/20",
        "Expert": "text-green-400 bg-green-500/10 border-green-500/20",
    };

    return (
        <div className="bg-[#1e293b] border border-gray-700/50 rounded-xl p-5 hover:border-amber-500/30 transition-all hover:shadow-lg hover:shadow-amber-500/5 group flex flex-col h-full">

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-100 group-hover:text-amber-400 transition">{skill.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${proficiencyColors[skill.proficiency] || "text-gray-400 bg-gray-500/10"}`}>
                    {skill.proficiency}
                </span>
            </div>

            <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">{skill.category}</p>

                {skill.target && (
                    <div className="bg-[#0f172a] p-3 rounded-lg border border-gray-800/50">
                        <div className="flex items-center gap-2 text-amber-500 mb-1">
                            <Target size={14} />
                            <span className="text-xs font-semibold uppercase">Improvement Plan</span>
                        </div>
                        <p className="text-sm text-gray-400 italic line-clamp-3">
                            "{skill.target}"
                        </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-700/50">
                <button
                    onClick={() => onEdit(skill)}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition bg-gray-800/50 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg"
                >
                    <Edit size={14} /> Edit
                </button>
                <button
                    onClick={() => onDelete(skill._id)}
                    className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1.5 rounded-lg"
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>

        </div>
    );
}

export default SkillCard;
