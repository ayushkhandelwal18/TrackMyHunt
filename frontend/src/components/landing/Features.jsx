import { Briefcase, Calendar, Code, Link, StickyNote, BarChart3 } from "lucide-react";

function Features() {
  const features = [
    {
      title: "Application Tracker",
      desc: "Track applied jobs, interview status, and personal notes in one place.",
      icon: <Briefcase size={28} />,
    },
    {
      title: "Opportunity Planner",
      desc: "Plan future job and internship openings month-wise and stay prepared.",
      icon: <Calendar size={28} />,
    },
    {
      title: "Skillboard",
      desc: "Monitor your technical skills and identify gaps for target roles.",
      icon: <Code size={28} />,
    },
    {
      title: "Resources Hub",
      desc: "Save important links, blogs, and preparation material for later.",
      icon: <Link size={28} />,
    },
    {
      title: "Notes & Journal",
      desc: "Maintain personal reminders and interview insights date-wise.",
      icon: <StickyNote size={28} />,
    },
    {
      title: "Progress Dashboard",
      desc: "Visual overview of your job-hunt activity and preparation status.",
      icon: <BarChart3 size={28} />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
            What You Can Do with <span className="text-amber-400">TrackMyHunt</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Everything you need to organize, track, and plan your job hunt in one powerful dashboard.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700/60 hover:border-amber-400 transition"
            >
              <div className="text-amber-400 mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
