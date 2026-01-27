// src/components/Graphs.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const wardData = [
  { ward: "Ward 1", resolved: 28, pending: 12, critical: 5 },
  { ward: "Ward 2", resolved: 20, pending: 15, critical: 3 },
  { ward: "Ward 3", resolved: 30, pending: 18, critical: 4 },
  { ward: "Ward 4", resolved: 35, pending: 22, critical: 8 },
  { ward: "Ward 5", resolved: 32, pending: 10, critical: 6 },
];

const categoryData = [
  { name: "Potholes", value: 156, color: "#0f766e" },
  { name: "Streetlights", value: 98, color: "#fb923c" },
  { name: "Garbage", value: 234, color: "#22c55e" },
  { name: "Water", value: 87, color: "#f59e0b" },
  { name: "Other", value: 45, color: "#8b5cf6" },
];

export default function Graphs() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold">
            Ward-wise Performance
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Issues resolved vs pending by ward
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wardData}>
              <XAxis dataKey="ward" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="resolved" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="critical" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold">
            Issue Categories
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Distribution by type
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {categoryData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {categoryData.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">
                    {item.name}
                  </span>
                </div>
                <span className="font-medium">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
