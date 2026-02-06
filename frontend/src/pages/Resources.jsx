import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { getResources, createResource, updateResource, deleteResource } from "../services/api";
import ResourceCard from "../components/resources/ResourceCard";
import ResourceForm from "../components/resources/ResourceForm";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await getResources();
      setResources(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddClick = () => {
    setEditingResource(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (res) => {
    setEditingResource(res);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await deleteResource(id);
      setResources(resources.filter(r => r._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      if (editingResource) {
        const updated = await updateResource(editingResource._id, formData);
        setResources(resources.map(r => r._id === updated._id ? updated : r));
      } else {
        const newRes = await createResource(formData);
        setResources([newRes, ...resources]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Group by Status for better organization? Or maybe just Type? 
  // Let's stick to a simple grid for now, maybe grouped by Status if there are many.
  // Actually, a Masonry or simple grid layout works best for resources.

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Resources</h1>
          <p className="text-gray-400">Your personal library of learning materials.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-amber-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-400 transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus size={20} /> Add Resource
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
      ) : resources.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
          <p className="text-gray-500 text-lg mb-4">No resources saved yet.</p>
          <button onClick={handleAddClick} className="text-amber-500 font-medium hover:underline">Add your first resource</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {resources.map(res => (
            <ResourceCard
              key={res._id}
              resource={res}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ResourceForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingResource}
        loading={submitLoading}
      />

    </div>
  );
}

export default Resources;
