import IssueCard from "./IssueCard";

export default function RecentIssues() {
  const issues = [
    {
      title: "Large pothole on MG Road",
      id: "#ISS-001",
      desc: "Dangerous pothole near bus stop causing accidents",
      priority: "Critical",
      priorityStyle: "bg-red-100 text-red-600",
      category: "Roads",
      status: "Critical",
      statusStyle: "bg-red-100 text-red-600",
      ward: "Ward 1",
      time: "about 2 years ago",
      votes: 45,
      ai: true,
      icon: "🕳"
    },
    {
      title: "Streetlight not working",
      id: "#ISS-002",
      desc: "Street lamp out for 2 weeks, safety concern at night",
      priority: "High",
      priorityStyle: "bg-yellow-100 text-yellow-700",
      category: "Electricity",
      status: "Pending",
      statusStyle: "bg-yellow-100 text-yellow-700",
      ward: "Ward 1",
      time: "about 2 years ago",
      votes: 28,
      ai: false,
      icon: "💡"
    },
    {
      title: "Garbage overflow at bin",
      id: "#ISS-003",
      desc: "Community bin overflowing, attracting stray animals",
      priority: "Medium",
      priorityStyle: "bg-orange-100 text-orange-600",
      category: "Sanitation",
      status: "In Progress",
      statusStyle: "bg-orange-100 text-orange-600",
      ward: "Ward 2",
      time: "about 2 years ago",
      votes: 15,
      ai: true,
      icon: "🗑"
    },
    {
      title: "Water pipeline leak",
      id: "#ISS-004",
      desc: "Major water wastage from broken pipeline",
      priority: "High",
      priorityStyle: "bg-yellow-100 text-yellow-700",
      category: "Water",
      status: "Pending",
      statusStyle: "bg-yellow-100 text-yellow-700",
      ward: "Ward 2",
      time: "about 2 years ago",
      votes: 32,
      ai: false,
      icon: "💧"
    },
    {
      title: "Sewage blockage",
      id: "#ISS-005",
      desc: "Blocked drain causing water logging during rain",
      priority: "Medium",
      priorityStyle: "bg-orange-100 text-orange-600",
      category: "Water",
      status: "Resolved",
      statusStyle: "bg-green-100 text-green-600",
      ward: "Ward 3",
      time: "about 2 years ago",
      votes: 10,
      ai: false,
      icon: "🚰"
    },
    {
      title: "Multiple potholes on inner road",
      id: "#ISS-006",
      desc: "Several potholes making road unusable",
      priority: "High",
      priorityStyle: "bg-yellow-100 text-yellow-700",
      category: "Roads",
      status: "Pending",
      statusStyle: "bg-yellow-100 text-yellow-700",
      ward: "Ward 3",
      time: "about 2 years ago",
      votes: 38,
      ai: true,
      icon: "🛣"
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Recent Issues</h2>
            <p className="text-gray-600">
              Latest reported civic issues in your city
            </p>
          </div>

          <button className="text-primary font-medium hover:underline flex items-center gap-1">
            View All →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((item, i) => (
            <IssueCard key={i} data={item} />
          ))}
        </div>

      </div>
    </section>
  );
}