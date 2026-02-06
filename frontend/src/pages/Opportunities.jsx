import { useState, useEffect } from "react";
import { Plus, Loader2, Search } from "lucide-react";
import { getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } from "../services/api";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import OpportunityForm from "../components/opportunities/OpportunityForm";

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleAddClick = () => {
    setEditingOpp(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (opp) => {
    setEditingOpp(opp);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this opportunity?")) return;
    try {
      await deleteOpportunity(id);
      setOpportunities(opportunities.filter(op => op._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      if (editingOpp) {
        const updated = await updateOpportunity(editingOpp._id, formData);
        setOpportunities(opportunities.map(op => op._id === updated._id ? updated : op));
      } else {
        const newOpp = await createOpportunity(formData);
        setOpportunities([newOpp, ...opportunities]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredOpps = opportunities.filter(op =>
    op.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    op.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Opportunities</h1>
          <p className="text-gray-400">Keep track of future job openings and referrals.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-amber-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-400 transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus size={20} /> Add Opportunity
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e293b] text-gray-100 pl-10 pr-4 py-3 rounded-xl border border-gray-700/50 focus:outline-none focus:border-amber-500 transition"
          />
        </div>
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
      ) : filteredOpps.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
          <p className="text-gray-500 text-lg mb-4">No opportunities found.</p>
          <button onClick={handleAddClick} className="text-amber-500 font-medium hover:underline">Add your first opportunity</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpps.map(op => (
            <OpportunityCard
              key={op._id}
              item={op}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <OpportunityForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingOpp}
        loading={submitLoading}
      />

    </div>
  );
}

export default Opportunities;
