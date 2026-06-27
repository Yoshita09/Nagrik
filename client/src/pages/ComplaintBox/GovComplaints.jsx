import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Building2 } from "lucide-react";

const statusColor = {
  Critical: "bg-red-100 text-red-600",
  Pending: "bg-yellow-100 text-yellow-600",
  "In Progress": "bg-orange-100 text-orange-600",
  Resolved: "bg-green-100 text-green-600",
  Assigned: "bg-blue-100 text-blue-600",
};

export default function GovComplaints() {
  const navigate = useNavigate();
  const location = useLocation();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchComplaints = useCallback(async () => {
  setLoading(true);

  // 1. Get all complaints
  const { data: complaintsData, error } = await supabase
    .from("complaints")
    .select("*")
    .order("created_at");

  if (error) {
    console.error("Error fetching complaints:", error);
    setLoading(false);
    return;
  }

  // 2. Get all updates
  const { data: updatesData, error: error2 } = await supabase
    .from("complaint_update")
    .select("*")
    .order("created_at", { ascending: false });

  if (error2) {
    console.error("Error fetching updates:", error2);
  }

  // 3. Map latest update per complaint_id
  const latestUpdateMap = {};

  updatesData?.forEach((u) => {
    if (!latestUpdateMap[u.complaint_id]) {
      latestUpdateMap[u.complaint_id] = u; // first = latest (desc order)
    }
  });

  // 4. Merge complaints + latest updates
  const merged = complaintsData.map((c) => {
    const latest = latestUpdateMap[c.id];

    return {
      ...c,
      status: latest?.status || c.status,
      department: latest?.department || c.department,
    };
  });

  setComplaints(merged);
  setLoading(false);
}, []);

  useEffect(() => {
    fetchComplaints();

    const channel = supabase
      .channel("complaints-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "complaints",
        },
        (payload) => {
          console.log("Realtime complaint update:", payload);

          if (payload.eventType === "UPDATE" && payload.new) {
            const updated = payload.new;

            setComplaints((prev) =>
              prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
            );
          }

          if (payload.eventType === "INSERT" || payload.eventType === "DELETE") {
            fetchComplaints();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchComplaints]);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchComplaints();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, fetchComplaints]);

  const filtered = complaints.filter((c) => {
    const s = search.toLowerCase();

    return (
      (String(c.id).toLowerCase().includes(s) ||
        (c.title || "").toLowerCase().includes(s) ||
        (c.location || "").toLowerCase().includes(s)) &&
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
            <h1 className="text-2xl font-semibold">Department Complaint Box</h1>
            <p className="text-gray-500 text-sm">
              Manage and update citizen complaints
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-6 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Search Complaints
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                className="outline-none w-full text-sm"
                placeholder="Search by ID, issue or location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Critical</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Assigned</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Department
            </label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm min-w-[200px]"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option>All</option>
              <option>Roads & Infrastructure</option>
              <option>Electrical Department</option>
              <option>Sanitation & Waste</option>
              <option>Water Supply</option>
              <option>General</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-200 font-medium">
            All Complaints ({filtered.length})
          </div>

          {loading ? (
            <div className="p-6 text-gray-500 text-sm">Loading complaints...</div>
          ) : (
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
                    <td className="p-3 font">{c.id}</td>
                    <td className="p-3">
                      <p className="font-medium">{c.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{c.description}</p>
                    </td>
                    <td className="p-3">{c.location}</td>
                    <td className="p-3">{c.ward}</td>
                    <td className="p-3">{c.department}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColor[c.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => navigate(`/gov-complaints/${c.id}`)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg text-xs
                                   hover:bg-teal-700 active:scale-[0.97] transition"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}