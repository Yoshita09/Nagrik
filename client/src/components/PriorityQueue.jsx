// src/components/PriorityQueue.jsx
import { Zap, Clock } from "lucide-react";

const issues = [
  {
    title: "Large pothole on MG Road",
    ward: "Ward 1",
    status: "Critical",
    count: "Reported 5x",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Streetlight not working",
    ward: "Ward 1",
    status: "Pending",
    count: "Reported 3x",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Multiple potholes on inner road",
    ward: "Ward 3",
    status: "Pending",
    count: "Reported 4x",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function PriorityQueue() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Zap size={18} className="text-orange-500" />
            Priority Queue
          </h3>
          <p className="text-sm text-gray-500">
            Auto-escalated issues
          </p>
        </div>

        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          3
        </span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {issues.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-4"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold">{item.title}</h4>
              <span
                className={`text-xs px-3 py-1 rounded-full ${item.color}`}
              >
                {item.status}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{item.ward}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> about 2 years ago
              </span>
            </div>

            <span className="inline-block mt-3 text-sm border rounded-full px-3 py-1 font-medium">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
