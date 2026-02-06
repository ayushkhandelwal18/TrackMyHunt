import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../services/api";
import SkillCard from "../components/skills/SkillCard";
import SkillForm from "../components/skills/SkillForm";

function Skillboard() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await getSkills();
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddClick = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);
      setSkills(skills.filter(s => s._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      if (editingSkill) {
        const updated = await updateSkill(editingSkill._id, formData);
        setSkills(skills.map(s => s._id === updated._id ? updated : s));
      } else {
        const newSkill = await createSkill(formData);
        setSkills([newSkill, ...skills]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Group skills by category
  const categories = ["Frontend", "Backend", "Tools", "Soft Skills", "Other"];

  const getSkillsByCategory = (cat) => skills.filter(s => s.category === cat);

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skillboard</h1>
          <p className="text-gray-400">Track your technical growth and self-improvement plan.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-amber-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-400 transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus size={20} /> Add Skill
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-amber-500" size={40} />
        </div>
      ) : error ? (
        <div className="text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
          Error: {error}
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
          <p className="text-gray-500 text-lg mb-4">No skills tracked yet.</p>
          <button onClick={handleAddClick} className="text-amber-500 font-medium hover:underline">Add your first skill</button>
        </div>
      ) : (
        <div className="space-y-10">
          {categories.map(cat => {
            const catSkills = getSkillsByCategory(cat);
            if (catSkills.length === 0) return null;

            return (
              <div key={cat}>
                <h2 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700/50 pb-2">{cat}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {catSkills.map(skill => (
                    <SkillCard
                      key={skill._id}
                      skill={skill}
                      onEdit={handleEditClick}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <SkillForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingSkill}
        loading={submitLoading}
      />

    </div>
  );
}

export default Skillboard;
