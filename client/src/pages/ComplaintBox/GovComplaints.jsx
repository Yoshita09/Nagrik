import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Search, Building2 } from "lucide-react";
import { complaintsData } from "../../data/complaintsData";


const statusColor = {
  Critical: "bg-red-100 text-red-600",
  Pending: "bg-yellow-100 text-yellow-600",
  "In Progress": "bg-orange-100 text-orange-600",
  Resolved: "bg-green-100 text-green-600",
};

export default function GovComplaints() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const filtered = complaintsData.filter((c) => {
    const s = search.toLowerCase();
    return (
      (c.id.toLowerCase().includes(s) ||
        c.title.toLowerCase().includes(s) ||
        c.location.toLowerCase().includes(s)) &&
      (statusFilter === "All" || c.status === statusFilter) &&
      (deptFilter === "All" || c.department === deptFilter)
    );
  });

  return (
    <section className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-600 text-white">
            <Building2 />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              Department Complaint Box
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and update citizen complaints
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              className="outline-none w-full text-sm"
              placeholder="Search by ID, issue or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Critical</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option>All</option>
            <option>Roads & Infrastructure</option>
            <option>Electrical Department</option>
            <option>Sanitation & Waste</option>
            <option>Water Supply</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200 font-medium">
            All Complaints ({filtered.length})
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Issue</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Ward</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Reported</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{c.id}</td>
                  <td className="p-3">
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.desc}</p>
                  </td>
                  <td className="p-3">{c.location}</td>
                  <td className="p-3">{c.ward}</td>
                  <td className="p-3">{c.department}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">{c.date}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/gov-complaints/${c.id}`)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-teal-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
