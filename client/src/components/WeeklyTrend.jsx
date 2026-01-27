// src/components/WeeklyTrend.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", reported: 45, resolved: 38 },
  { day: "Tue", reported: 52, resolved: 48 },
  { day: "Wed", reported: 38, resolved: 42 },
  { day: "Thu", reported: 65, resolved: 55 },
  { day: "Fri", reported: 48, resolved: 52 },
  { day: "Sat", reported: 32, resolved: 35 },
  { day: "Sun", reported: 28, resolved: 30 },
];

export default function WeeklyTrend() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Weekly Trend</h3>
      <p className="text-sm text-gray-500 mb-6">
        Issues reported vs resolved this week
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="reported"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="resolved"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-500" />
          Reported
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Resolved
        </div>
      </div>
    </div>
  );
}
