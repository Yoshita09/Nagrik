const stats = [
  { title: "Total Issues", value: "248", icon: "📄" },
  { title: "Resolved", value: "145", trend: "+12% vs last week", icon: "✅", bg: "bg-green-50" },
  { title: "Pending", value: "77", icon: "⚡", bg: "bg-orange-50" },
  { title: "Active Citizens", value: "2,847", icon: "👥", bg: "bg-teal-50" },
];

export default function Dashboard() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-soft ${s.bg || "bg-white"}`}
          >
            <div className="flex justify-between items-start">
              <p className="text-gray-600 font-medium">{s.title}</p>
              <span className="text-xl">{s.icon}</span>
            </div>

            <h2 className="text-3xl font-bold mt-4">{s.value}</h2>

            {s.trend && (
              <p className="text-green-600 text-sm mt-2">{s.trend}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}