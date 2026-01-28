import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  Building2,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";

const complaintsData = [
  {
    id: "ISS-001",
    title: "Large pothole on MG Road",
    desc: "Dangerous pothole near bus stop",
    location: "MG Road, Near Metro",
    ward: "Ward 1",
    department: "Roads & Infrastructure",
    status: "Critical",
    date: "05/01/2024",
  },
  {
    id: "ISS-002",
    title: "Streetlight not working",
    desc: "Street lamp out for 2 weeks",
    location: "Brigade Road, Sector 4",
    ward: "Ward 1",
    department: "Electrical Department",
    status: "Pending",
    date: "08/01/2024",
  },
  {
    id: "ISS-003",
    title: "Garbage overflow at bin",
    desc: "Community bin overflowing",
    location: "Residency Road",
    ward: "Ward 2",
    department: "Sanitation & Waste",
    status: "In Progress",
    date: "10/01/2024",
  },
  {
    id: "ISS-004",
    title: "Water pipeline leak",
    desc: "Major water leakage",
    location: "Lavelle Road",
    ward: "Ward 2",
    department: "Water Supply",
    status: "Pending",
    date: "12/01/2024",
  },
  {
    id: "ISS-005",
    title: "Sewage blockage",
    desc: "Drain blockage",
    location: "Richmond Road",
    ward: "Ward 3",
    department: "Water Supply",
    status: "Resolved",
    date: "02/01/2024",
  },
  {
    id: "ISS-006",
    title: "Multiple potholes on inner road",
    desc: "Several potholes making road unsafe",
    location: "Church Street, Lane 3",
    ward: "Ward 3",
    department: "Roads & Infrastructure",
    status: "Pending",
    date: "11/01/2024",
  },
];



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

  const filteredComplaints = complaintsData.filter((c) => {
    const matchSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || c.status === statusFilter;

    const matchDept =
      deptFilter === "All" || c.department === deptFilter;

    return matchSearch && matchStatus && matchDept;
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
            <h1 className="text-2xl font-bold">Department Complaint Box</h1>
            <p className="text-gray-500">
              Manage and update citizen complaints
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-xl flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 border-2 border-gray-400 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, title, or location..."
              className="outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="border-2 border-gray-400 rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Critical</option>
          </select>

          <select
            className="border-2 border-gray-400 rounded-lg px-4 py-2"
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
        <div className="bg-white border-1 border-gray-500 rounded-xl overflow-hidden">
          <div className="p-4 border-b font-semibold">
            All Complaints ({filteredComplaints.length})
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
              {filteredComplaints.map((c) => (
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[c.status]}`}
                    >
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
