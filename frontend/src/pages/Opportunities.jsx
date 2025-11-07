import { useState } from "react";
import { Plus } from "lucide-react";

function Opportunities() {
  const [opportunities, setOpportunities] = useState([
    {
      company: "Amazon",
      role: "SDE Intern",
      skills: "DSA, OOPS, DBMS",
      openingMonth: "2025-03",
      type: "Internship",
      link: "https://amazon.jobs",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newOpp, setNewOpp] = useState({
    company: "",
    role: "",
    skills: "",
    openingMonth: "",
    type: "",
    otherType: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOpp({ ...newOpp, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!newOpp.company || !newOpp.role || !newOpp.openingMonth || !newOpp.type) {
      return alert("Please fill all required fields (except Skills & Link).");
    }

    const finalType = newOpp.type === "Other" ? newOpp.otherType : newOpp.type;

    const newEntry = { ...newOpp, type: finalType };
    setOpportunities([...opportunities, newEntry]);
    setShowForm(false);
    setNewOpp({
      company: "",
      role: "",
      skills: "",
      openingMonth: "",
      type: "",
      otherType: "",
      link: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-8 pt-20 ml-64">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-400">Upcoming Opportunities</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} /> {showForm ? "Close" : "Add"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-[#1e293b] p-6 rounded-xl shadow mb-8 grid grid-cols-2 gap-4"
        >
          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Company Name *"
            value={newOpp.company}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          {/* Role */}
          <input
            type="text"
            name="role"
            placeholder="Job Role (e.g. SDE, SWE) *"
            value={newOpp.role}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills Required (optional)"
            value={newOpp.skills}
            onChange={handleChange}
            className="p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          {/* Opening Month */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">Opening Month *</label>
            <input
              type="month"
              name="openingMonth"
              value={newOpp.openingMonth}
              onChange={handleChange}
              required
              className="p-2 rounded bg-[#0f172a] border border-gray-700 text-gray-200 focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Type Dropdown */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm text-gray-400 mb-1">Type *</label>
            <select
              name="type"
              value={newOpp.type}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 text-gray-300 focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Select Type *</option>
              <option>Job</option>
              <option>Internship</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Freelance</option>
              <option>Other</option>
            </select>

            {/* Other Type Input - Below dropdown (no overlap) */}
            {newOpp.type === "Other" && (
              <input
                type="text"
                name="otherType"
                placeholder="Specify Type"
                value={newOpp.otherType}
                onChange={handleChange}
                className="mt-3 p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
              />
            )}
          </div>

          {/* Link (Optional) */}
          <input
            type="url"
            name="link"
            placeholder="Official Job/Internship Link (optional)"
            value={newOpp.link}
            onChange={handleChange}
            className="col-span-2 p-2 rounded bg-[#0f172a] border border-gray-700 focus:ring-2 focus:ring-amber-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded transition"
          >
            Save Opportunity
          </button>
        </form>
      )}

      {/* Opportunities Table */}
      <div className="bg-[#1e293b] p-6 rounded-xl shadow-md overflow-x-auto">
        {opportunities.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Skills</th>
                <th className="py-3 px-4 text-left">Opening Month</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-[#2d3b53] transition"
                >
                  <td className="py-3 px-4 text-gray-200 max-w-[150px] truncate" title={opp.company}>
                    {opp.company}
                  </td>
                  <td className="py-3 px-4 text-gray-200 max-w-[150px] truncate" title={opp.role}>
                    {opp.role}
                  </td>
                  <td className="py-3 px-4 text-gray-400 max-w-[180px] truncate" title={opp.skills}>
                    {opp.skills || "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-400">{opp.openingMonth}</td>
                  <td className="py-3 px-4 text-gray-300">{opp.type}</td>
                  <td className="py-3 px-4">
                    {opp.link ? (
                      <a
                        href={opp.link}
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
          <p className="text-gray-400">No upcoming opportunities yet.</p>
        )}
      </div>
    </div>
  );
}

export default Opportunities;
