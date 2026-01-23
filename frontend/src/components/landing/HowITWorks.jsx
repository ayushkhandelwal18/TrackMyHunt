function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      desc: "Sign up and get your personal job-hunt dashboard in seconds.",
    },
    {
      step: "02",
      title: "Track & Plan",
      desc: "Add applications, upcoming opportunities, and skills you want to build.",
    },
    {
      step: "03",
      title: "Stay Prepared",
      desc: "Save resources, write notes, and monitor your progress in one place.",
    },
    {
      step: "04",
      title: "Move Forward",
      desc: "Use insights to prepare better and never miss an opportunity.",
    },
  ];

  return (
    <section id="howitworks" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200">
            How <span className="text-amber-400">TrackMyHunt</span> Works
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A simple workflow to help you stay organized, focused, and ready for every opportunity.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700/60 hover:border-amber-400 transition"
            >
              <div className="text-amber-400 text-3xl font-bold mb-4">
                {item.step}
              </div>
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

export default HowItWorks;
