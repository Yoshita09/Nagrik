import {
  FileText,
  CheckCircle,
  Zap,
  Users
} from "lucide-react";

export default function HeroCard() {
  const stats = [
    {
      title: "Total Issues",
      value: "248",
      icon: FileText,
      bg: "bg-white",
      iconBg: "bg-gray-100 text-gray-600",
      border: "border-gray-200"
    },
    {
      title: "Resolved",
      value: "145",
      trend: "↑ 12% vs last week",
      icon: CheckCircle,
      bg: "bg-green-50",
      iconBg: "bg-green-100 text-green-600",
      border: "border-green-200"
    },
    {
      title: "Pending",
      value: "77",
      icon: Zap,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100 text-orange-600",
      border: "border-orange-200"
    },
    {
      title: "Active Citizens",
      value: "2,847",
      icon: Users,
      bg: "bg-teal-50",
      iconBg: "bg-teal-100 text-primary",
      border: "border-teal-200"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`
                p-6 rounded-2xl border ${item.border} ${item.bg}
                shadow-sm transition-all duration-300 ease-out
                hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02]
                cursor-pointer
              `}
            >
              <div className="flex justify-between items-start">
                <p className="text-gray-600 font-medium">{item.title}</p>

                <div className={`p-2 rounded-xl ${item.iconBg}`}>
                  <Icon size={18} />
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-4">{item.value}</h2>

              {item.trend && (
                <p className="text-green-600 text-sm mt-2">
                  {item.trend}
                </p>
              )}
            </div>
          );
        })}

      </div>
    </section>
  );
}