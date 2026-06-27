// src/pages/Dashboard.jsx

import HeroCard from "../components/Home_card";
import Graphs from "../components/analysis/Graphs";
import WeeklyTrend from "../components/analysis/WeeklyTrend";
import PriorityQueue from "../components/analysis/PriorityQueue";
import DepartmentPerformance from "../components/analysis/DepartmentPerformance";

export default function Dashboard() {

  const handleExport = () => {
    console.log("Export clicked ✅");
    window.print(); // ✅ BEST METHOD
  };

  return (
    <section className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-4 print-area a4">

        {/* Header */}
        <div className="flex justify-between items-center no-print">
          <div>
            <h1 className="text-2xl font-bold">Department Dashboard</h1>
            <p className="text-gray-500">
              Unified view of civic issues across all departments
            </p>
          </div>

          <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-lg">
              Alerts{" "}
              <span className="ml-2 bg-red-500 text-white px-2 rounded-full">
                3
              </span>
            </button>

            {/* ✅ EXPORT BUTTON */}
            <button
              onClick={handleExport}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Cards */}
        <HeroCard />

        {/* Graphs */}
        <Graphs />

        {/* Weekly Trend + Priority Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          <div className="lg:col-span-2">
            <WeeklyTrend />
          </div>
          <PriorityQueue />
        </div>

        {/* Department Performance */}
        <div className="department-text">
        <DepartmentPerformance />
        </div>
      </div>
    </section>
  );
}