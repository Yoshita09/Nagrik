// src/components/DepartmentPerformance.jsx
import { Building2, TrendingUp, TrendingDown } from "lucide-react";

const departments = [
  {
    name: "Roads & Infrastructure",
    total: 156,
    resolved: 114,
    pending: 42,
    avgTime: "4.2d",
    resolutionRate: 73,
    score: 78,
    trend: "down",
  },
  {
    name: "Electrical Department",
    total: 98,
    resolved: 80,
    pending: 18,
    avgTime: "2.8d",
    resolutionRate: 82,
    score: 85,
    trend: "up",
  },
  {
    name: "Sanitation & Waste",
    total: 234,
    resolved: 178,
    pending: 56,
    avgTime: "1.5d",
    resolutionRate: 76,
    score: 82,
    trend: "up",
  },
  {
    name: "Water Supply",
    total: 87,
    resolved: 63,
    pending: 24,
    avgTime: "3.6d",
    resolutionRate: 72,
    score: 72,
    trend: "down",
  },
  {
    name: "General Services",
    total: 45,
    resolved: 33,
    pending: 12,
    avgTime: "5.1d",
    resolutionRate: 73,
    score: 68,
    trend: "down",
  },
];

export default function DepartmentPerformance() {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">
          Department Performance
        </h2>
        <p className="text-sm text-gray-500">
          Resolution rates and average time by department
        </p>
      </div>

      {/* Department Cards */}
      <div className="space-y-4">
        {departments.map((dept, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-4"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <Building2 size={18} />
                </div>

                <div>
                  <h3 className="font-semibold">{dept.name}</h3>
                  <p className="text-sm text-gray-500">
                    {dept.total} total issues
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-bold">
                    {dept.score}%
                  </span>
                  {dept.trend === "up" ? (
                    <TrendingUp size={16} className="text-green-600" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Performance Score
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="bg-gray-50 rounded-xl py-4 text-center">
                <p className="text-l font-bold text-green-600">
                  {dept.resolved}
                </p>
                <p className="text-sm text-gray-500">Resolved</p>
              </div>

              <div className="bg-gray-50 rounded-xl py-4 text-center">
                <p className="text-l font-bold text-orange-500">
                  {dept.pending}
                </p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>

              <div className="bg-gray-50 rounded-xl py-4 text-center">
                <p className="text-l font-bold">
                  {dept.avgTime}
                </p>
                <p className="text-sm text-gray-500">Avg. Time</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Resolution Rate</span>
                <span className="text-gray-600">
                  {dept.resolutionRate}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-teal-700 rounded-full"
                  style={{ width: `${dept.resolutionRate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
