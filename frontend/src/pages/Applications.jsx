import { useState, useEffect } from "react";
import { Plus, Loader2, Search, Filter } from "lucide-react";
import { getApplications, createApplication, updateApplication, deleteApplication } from "../services/api";
import ApplicationCard from "../components/applications/ApplicationCard";
import ApplicationForm from "../components/applications/ApplicationForm";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Search/Filter State (Basic placeholder implementation for now)
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApps = async () => {
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleAddClick = () => {
    setEditingApp(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (app) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await deleteApplication(id);
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitLoading(true);
      if (editingApp) {
        const updated = await updateApplication(editingApp._id, formData);
        setApplications(applications.map(app => app._id === updated._id ? updated : app));
      } else {
        const newApp = await createApplication(formData);
        setApplications([newApp, ...applications]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredApps = applications.filter(app =>
    app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.role.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
          <p className="text-gray-400">Track and manage your job applications efficiently.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-amber-500 text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-400 transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus size={20} /> Add Application
        </button>
      </div>

      {/* Filters & Search */}
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
        {/* Placeholder for future filter dropdowns */}
        {/* <button className="bg-[#1e293b] text-gray-300 px-4 py-3 rounded-xl border border-gray-700/50 hover:bg-[#283548] transition flex items-center gap-2">
              <Filter size={20} /> Filter
          </button> */}
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
      ) : filteredApps.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
          <p className="text-gray-500 text-lg mb-4">No applications found.</p>
          <button onClick={handleAddClick} className="text-amber-500 font-medium hover:underline">Add your first application</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map(app => (
            <ApplicationCard
              key={app._id}
              app={app}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ApplicationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingApp}
        loading={submitLoading}
      />

    </div>
  );
}

export default Applications;
