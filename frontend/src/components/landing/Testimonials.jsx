function Testimonials() {
  const reviews = [
    {
      name: "Aman Verma",
      role: "Final Year CS Student",
      quote:
        "TrackMyHunt helped me stop missing follow-ups. I finally had a clear view of all my applications.",
    },
    {
      name: "Priya Singh",
      role: "SDE Intern",
      quote:
        "The opportunities planner made my prep month-wise. I felt more confident before hiring season.",
    },
    {
      name: "Rohit Saini",
      role: "Backend Developer",
      quote:
        "Saving resources and notes in one place changed how I prepare for interviews.",
    },

  ];

  return (
    <section id="testimonials" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
            What Students Say
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real feedback from students using TrackMyHunt to organize their job search.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700/60 hover:border-amber-400 transition"
            >
              <p className="text-gray-400 mb-4">“{item.quote}”</p>
              <h4 className="text-gray-200 font-semibold">{item.name}</h4>
              <span className="text-sm text-gray-500">{item.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
