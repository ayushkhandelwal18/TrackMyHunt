import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, Calendar, XCircle, Clock,
  TrendingUp, ExternalLink, Plus,
  ArrowRight, Loader2, Zap, FileText
} from "lucide-react";
import { getDashboardStats } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin text-amber-500" size={40} />
    </div>
  );

  if (error) return (
    <div className="text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
      Error: {error}
    </div>
  );

  return (
    <div className="space-y-8">

      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <SummaryCard
          title="Total Applications"
          count={stats.counts.total}
          icon={<Briefcase size={20} />}
          color="bg-blue-500/10 text-blue-500 border-blue-500/20"
        />
        <SummaryCard
          title="Interviews"
          count={stats.counts.interview}
          icon={<Calendar size={20} />}
          color="bg-amber-500/10 text-amber-500 border-amber-500/20"
        />
        <SummaryCard
          title="Pending Actions"
          count={stats.counts.pending}
          icon={<Clock size={20} />}
          color="bg-purple-500/10 text-purple-500 border-purple-500/20"
        />
        <SummaryCard
          title="Rejections"
          count={stats.counts.rejected}
          icon={<XCircle size={20} />}
          color="bg-red-500/10 text-red-500 border-red-500/20"
        />
        <SummaryCard
          title="Resumes Saved"
          count={stats.counts.resumes}
          icon={<FileText size={20} />}
          color="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 2. Recent Activity (Applications) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <TrendingUp size={20} className="text-amber-500" /> Recent Applications
            </h2>
            <Link to="/applications" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-[#1e293b] border border-gray-700/50 rounded-xl overflow-hidden">
            {stats.recentApplications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No applications yet.</div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {stats.recentApplications.map(app => (
                  <div key={app._id} className="p-4 flex justify-between items-center hover:bg-gray-800/30 transition">
                    <div>
                      <h4 className="font-semibold text-gray-200">{app.company}</h4>
                      <p className="text-sm text-gray-400">{app.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block mb-1">
                        {new Date(app.updatedAt).toLocaleDateString()}
                      </span>
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. Side Column: Actions & Skills & Upcoming */}
        <div className="space-y-8">

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-100 mb-4 flex items-center gap-2">
              <Zap size={18} className="text-amber-400" /> Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/applications" className="block w-full text-center py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition text-sm font-medium border border-gray-700">
                + Add Application
              </Link>
              <Link to="/opportunities" className="block w-full text-center py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition text-sm font-medium border border-gray-700">
                + Add Opportunity
              </Link>
              <Link to="/notes" className="block w-full text-center py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition text-sm font-medium border border-gray-700">
                + Add Note
              </Link>
              <Link to="/resumes" className="block w-full text-center py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition text-sm font-medium border border-gray-700">
                + Add Resume
              </Link>
            </div>
          </div>

          {/* Upcoming/Shortlist Check */}
          {/* Simplified for now as just a list of upcoming opportunities or high priority items */}
          <div>
            <h3 className="font-bold text-gray-100 mb-4">Upcoming Opportunities</h3>
            <div className="space-y-3">
              {stats.upcomingOpportunities.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No upcoming opportunities.</p>
              ) : (
                stats.upcomingOpportunities.map(opp => (
                  <div key={opp._id} className="bg-[#1e293b] border border-gray-700/50 p-3 rounded-lg flex justify-between items-center group hover:border-amber-500/30 transition">
                    <div>
                      <div className="font-medium text-gray-300 group-hover:text-amber-400 transition">{opp.company}</div>
                      <div className="text-xs text-gray-500">{opp.openingMonth} {opp.openingYear}</div>
                    </div>
                    {opp.link && (
                      <a href={opp.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Skill Snapshot (Compact) */}
          <div>
            <h3 className="font-bold text-gray-100 mb-4">Skill Snapshot</h3>
            <div className="bg-[#1e293b] border border-gray-700/50 p-4 rounded-xl space-y-3">
              <SkillBar label="Expert" count={stats.skillStats["Expert"] || 0} color="bg-green-500" />
              <SkillBar label="Advanced" count={stats.skillStats["Advanced"] || 0} color="bg-orange-500" />
              <SkillBar label="Intermediate" count={stats.skillStats["Intermediate"] || 0} color="bg-yellow-500" />
              <SkillBar label="Beginner" count={stats.skillStats["Beginner"] || 0} color="bg-blue-500" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Sub-components for cleaner code
function SummaryCard({ title, count, icon, color }) {
  return (
    <div className={`p-6 rounded-xl border ${color.replace("text-", "border-").split(" ")[2]} bg-[#1e293b] relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition transform scale-150`}>
        {icon}
      </div>
      <div className="relative z-10">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-gray-100">{count}</h3>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    "Applied": "text-blue-400 bg-blue-500/10",
    "Resume Shortlisted": "text-purple-400 bg-purple-500/10",
    "OA Done": "text-cyan-400 bg-cyan-500/10",
    "Interview Scheduled": "text-yellow-400 bg-yellow-500/10",
    "Interview Done": "text-orange-400 bg-orange-500/10",
    "Rejected": "text-red-400 bg-red-500/10",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || "text-gray-400 bg-gray-500/10"}`}>
      {status}
    </span>
  );
}

function SkillBar({ label, count, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-20">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${Math.min(count * 10, 100)}%` }} // Arbitrary scaling for visual
        ></div>
      </div>
      <span className="text-xs font-bold text-gray-300">{count}</span>
    </div>
  );
}

export default Dashboard;
