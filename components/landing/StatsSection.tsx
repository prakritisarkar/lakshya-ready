const STATS = [
  { value: "12,000+", label: "Mock Interviews Completed" },
  { value: "94%", label: "Users Placed Within 3 Months" },
  { value: "5 Roles", label: "Specialized Interview Tracks" },
  { value: "< 30s", label: "To Start Your First Interview" },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 border-y border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="font-syne font-black text-3xl md:text-4xl gradient-text mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-white/35 font-dm leading-snug">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}