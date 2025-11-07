import { useState } from "react";
import { Plus } from "lucide-react";

function Applications() {
  const [applications, setApplications] = useState([
    {
      company: "Google",
      role: "Software Engineer Intern",
      type: "Summer Intern",
      skills: "DSA, Python, DBMS",
      status: "Interview Scheduled",
      link: "https://careers.google.com",
      date: "2025-10-28",
      notes: "HR round next week",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newApp, setNewApp] = useState({
    company: "",
    role: "",
    type: "",
    otherType: "",
    skills: "",
    status: "",
    otherStatus: "",
    link: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewApp({ ...newApp, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!newApp.company || !newApp.role || !newApp.type || !newApp.status || !newApp.date) {
      return alert("Please fill all required fields (except Link, Skills, and Notes).");
    }

    const finalType = newApp.type === "Other" ? newApp.otherType : newApp.type;
    const finalStatus = newApp.status === "Other" ? newApp.otherStatus : newApp.status;

    const newEntry = {
      ...newApp,
      type: finalType,
      status: finalStatus,
    };

    setApplications([...applications, newEntry]);
    setShowForm(false);
    setNewApp({
      company: "",
      role: "",
      type: "",
      otherType: "",
      skills: "",
      status: "",
      otherStatus: "",
      link: "",
      date: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-8 pt-20 ml-64">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-400">Your Applications</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} /> {showForm ? "Close" : "Add"}
        </button>
      </div>

      {/* Form Box */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-[#1e293b] p-6 rounded-xl shadow mb-8 grid grid-cols-2 gap-4 relative"
        >
          <input
            type="date"
            name="date"
            value={newApp.date}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#0f172a] border border-gray-700 text-gray-300 focus:ring-2 focus:ring-amber-400"
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name *"
            value={newApp.company}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          <input
            type="text"
            name="role"
            placeholder="Role (e.g. SDE Intern) *"
            value={newApp.role}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          {/* Type with Other option */}
          <div className="relative">
            <select
              name="type"
              value={newApp.type}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 text-gray-300"
            >
              <option value="">Select Type *</option>
              <option>Summer Intern</option>
              <option>Winter Intern</option>
              <option>Full-time Job</option>
              <option>Remote Work</option>
              <option>Hybrid</option>
              <option>Freelance</option>
              <option>Other</option>
            </select>
            {newApp.type === "Other" && (
              <input
                type="text"
                name="otherType"
                placeholder="Specify Type"
                value={newApp.otherType}
                onChange={handleChange}
                className="absolute top-full left-0 mt-2 w-full p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
              />
            )}
          </div>

          <input
            type="text"
            name="skills"
            placeholder="Top Skills (optional)"
            value={newApp.skills}
            onChange={handleChange}
            className="p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          {/* Status with Other option */}
          <div className="relative">
            <select
              name="status"
              value={newApp.status}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 text-gray-300"
            >
              <option value="">Select Status *</option>
              <option>Applied</option>
              <option>Resume Shortlisted</option>
              <option>Rejection Came</option>
              <option>OA Done</option>
              <option>Interview Scheduled</option>
              <option>Interview Done</option>
              <option>Other</option>
            </select>
            {newApp.status === "Other" && (
              <input
                type="text"
                name="otherStatus"
                placeholder="Specify Status"
                value={newApp.otherStatus}
                onChange={handleChange}
                className="absolute top-full left-0 mt-2 w-full p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
              />
            )}
          </div>

          <input
            type="url"
            name="link"
            placeholder="Application Link (optional)"
            value={newApp.link}
            onChange={handleChange}
            className="p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          <textarea
            name="notes"
            placeholder="Notes / Comments (optional)"
            value={newApp.notes}
            onChange={handleChange}
            className="col-span-2 p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400 h-20 resize-none"
          />

          <button
            type="submit"
            className="col-span-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded transition"
          >
            Save Application
          </button>
        </form>
      )}

      {/* Application Table */}
      <div className="bg-[#1e293b] p-6 rounded-xl shadow-md overflow-x-auto">
        {applications.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Skills</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Link</th>
                <th className="py-3 px-4 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-[#2d3b53] transition"
                >
                  {["date", "company", "role", "type", "skills", "status", "notes"].map((field) => (
                    <td
                      key={field}
                      className="py-3 px-4 text-gray-300 max-w-[150px] truncate"
                      title={app[field]}
                    >
                      {app[field] || "-"}
                    </td>
                  ))}
                  <td className="py-3 px-4">
                    {app.link ? (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 underline"
                      >
                        Visit
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No applications added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Applications;
