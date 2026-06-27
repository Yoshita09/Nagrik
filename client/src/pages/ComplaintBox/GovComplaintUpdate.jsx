import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Building2,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

/* Status Color Mapping */
const statusColor = {
  Critical: "bg-red-100 text-red-600",
  Pending: "bg-yellow-100 text-yellow-600",
  "In Progress": "bg-orange-100 text-orange-600",
  Resolved: "bg-green-100 text-green-600",
  Assigned: "bg-blue-100 text-blue-600",
};

export default function GovComplaintUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* Helpers */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  /* ---------------- FETCH COMPLAINT ---------------- */
  const fetchComplaint = async () => {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Complaint fetch error:", error);
      return;
    }

    setComplaint(data);
    setSelectedStatus(data?.status || "Pending");
    setSelectedDept(data?.department || "General");
  };

  /* ---------------- FETCH TIMELINE ---------------- */
  const fetchTimeline = async () => {
    const { data, error } = await supabase
      .from("complaint_update")
      .select("*")
      .eq("complaint_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Timeline fetch error:", error);
      return;
    }

    setTimeline(data || []);
  };

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchComplaint(), fetchTimeline()]);
      setLoading(false);
    };

    if (id) load();
  }, [id]);

  /* ---------------- COMMON TIMELINE INSERT ---------------- */
  const addTimelineEntry = async ({
    status,
    department,
    noteText,
    localOnly = false,
  }) => {
    const newEntry = {
      complaint_id: id,
      status,
      department,
      note: noteText,
      created_at: new Date().toISOString(),
    };

    // Optimistic UI update
    setTimeline((prev) => [
      {
        id: Date.now(),
        ...newEntry,
      },
      ...prev,
    ]);

    if (!localOnly) {
      const { error } = await supabase
        .from("complaint_update")
        .insert([newEntry]);

      if (error) {
        console.error("Timeline insert error:", error);
      }
    }
  };

  /* ---------------- REFRESH EVERYTHING ---------------- */
  const refreshData = async () => {
    await Promise.all([fetchComplaint(), fetchTimeline()]);
  };

  /* ---------------- UPDATE STATUS ---------------- */
  const handleStatusUpdate = async () => {
    if (!selectedStatus) return alert("Please select a status");
    if (!selectedDept) return alert("Please select a department");

    setUpdating(true);

    const noteText = note?.trim() || `Status updated to ${selectedStatus}`;

    try {
      // 1. Optimistic complaint update
      setComplaint((prev) => ({
        ...prev,
        status: selectedStatus,
        department: selectedDept,
      }));

      // 2. Optimistic timeline update
      await addTimelineEntry({
        status: selectedStatus,
        department: selectedDept,
        noteText,
      });

      // 3. Update main complaints table
      const { error: mainError } = await supabase
        .from("complaints")
        .update({
          status: selectedStatus,
          department: selectedDept,
        })
        .eq("id", id);

      if (mainError) {
        console.error("Main update error:", mainError);
        alert("Failed to update complaint");
        await refreshData();
        return;
      }

      // 4. Reset note field
      setNote("");

      // 5. Background sync for perfect consistency
      await refreshData();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Something went wrong while updating");
      await refreshData();
    } finally {
      setUpdating(false);
    }
  };

  /* ---------------- QUICK STATUS UPDATE ---------------- */
  const updateStatusQuickly = async (newStatus, noteText) => {
    if (!complaint) return;

    setUpdating(true);

    try {
      // 1. Optimistic complaint update
      setComplaint((prev) => ({
        ...prev,
        status: newStatus,
      }));

      setSelectedStatus(newStatus);
      setSelectedDept(complaint.department);

      // 2. Optimistic timeline update
      await addTimelineEntry({
        status: newStatus,
        department: complaint.department,
        noteText,
      });

      // 3. DB update
      const { error } = await supabase
        .from("complaints")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("Quick update error:", error);
        alert("Failed to update complaint");
        await refreshData();
        return;
      }

      // 4. Background sync
      await refreshData();
    } catch (err) {
      console.error("Quick status update error:", err);
      alert("Something went wrong");
      await refreshData();
    } finally {
      setUpdating(false);
    }
  };

  /* ---------------- MANUAL DELEGATE ---------------- */
  const handleManualDelegate = async () => {
    if (!complaint) return;

    if (selectedDept === complaint.department) {
      return alert("Department already assigned");
    }

    setUpdating(true);

    const noteText = `Complaint assigned to ${selectedDept}`;

    try {
      // 1. Optimistic complaint update
      setComplaint((prev) => ({
        ...prev,
        department: selectedDept,
        status: "Assigned",
      }));

      setSelectedDept(selectedDept);
      setSelectedStatus("Assigned");

      // 2. Optimistic timeline update
      await addTimelineEntry({
        status: "Assigned",
        department: selectedDept,
        noteText,
      });

      // 3. DB update
      const { error } = await supabase
        .from("complaints")
        .update({
          department: selectedDept,
          status: "Assigned",
        })
        .eq("id", id);

      if (error) {
        console.error("Department assign error:", error);
        alert("Failed to assign department");
        await refreshData();
        return;
      }

      // 4. Background sync
      await refreshData();
    } catch (err) {
      console.error("Manual delegate error:", err);
      alert("Something went wrong");
      await refreshData();
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading complaint...
      </div>
    );
  }
  const latestTimelineStatus =
  timeline && timeline.length > 0 ? timeline[0].status : complaint?.status;

const latestTimelineDepartment =
  timeline && timeline.length > 0
    ? timeline[0].department
    : complaint?.department;

  return (
    <section className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate("/gov-complaints", { state: { refresh: true } })}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={18} /> Back to Complaint Box
        </button>

        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-3 flex-wrap">
              {complaint.title}
              <span
  className={`text-xs px-3 py-1 rounded-full ${
    statusColor[latestTimelineStatus] || "bg-gray-100 text-gray-600"
  }`}
>
  {latestTimelineStatus}
</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Complaint ID: {complaint.id}
            </p>
          </div>

          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm">
            Auto-delegated by AI
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold">Issue Details</h2>

              <p className="font-medium">
                {complaint.description || "No description available"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Detail
                  icon={<MapPin />}
                  title="Location"
                  value={complaint.location}
                />
                <Detail
                  icon={<Building2 />}
                  title="Ward Number"
                  value={complaint.ward}
                />
                <Detail
                  icon={<User />}
                  title="Reported By"
                  value={complaint.reported_by ?? "Citizen"}
                />
                <Detail
                  icon={<Calendar />}
                  title="Reported On"
                  value={
                    complaint.created_at
                      ? formatDate(complaint.created_at)
                      : "N/A"
                  }
                />
                <Detail
                  icon={<Building2 />}
                  title="Current Department"
                  value={complaint.department}
                />
              </div>

              <div className="flex gap-10 pt-4 border-t border-gray-200">
                <Stat
                  label="Upvotes"
                  value={complaint.upvotes ?? 0}
                  color="text-teal-600"
                />
                <Stat
                  label="Repeat Reports"
                  value={complaint.repeats ?? 0}
                  color="text-orange-500"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">Update Timeline</h2>

              {/* Initial complaint entry */}
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Clock size={18} />
                </div>

                <div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-yellow-100 text-yellow-600">
                    Reported
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {complaint.created_at
                      ? formatDateTime(complaint.created_at)
                      : "N/A"}
                  </p>
                  <p className="text-sm">Issue reported by citizen</p>
                </div>
              </div>
              <div className="border-t border-gray-300 my-4"></div>

              {/* Updates */}
              {timeline.length > 0 ? (
                timeline.map((t) => (
                  <div key={t.id} className="flex gap-4 items-start">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <Clock size={18} />
                    </div>

                    <div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          statusColor[t.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {t.created_at ? formatDateTime(t.created_at) : "N/A"}
                      </p>
                      <p className="text-sm">{t.note}</p>
                      {t.department && (
                        <p className="text-xs text-gray-400 mt-1">
                          Department: {t.department}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No updates yet.</p>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Update Status */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">Update Status</h2>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                disabled={updating}
              >
                <option>Critical</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Assigned</option>
              </select>

              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Add a note about this update..."
                disabled={updating}
              />

              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="w-full bg-teal-600 text-white py-3 rounded-lg flex justify-center gap-2
                           hover:bg-teal-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={18} />
                {updating ? "Updating..." : "Update Status"}
              </button>
            </div>

            {/* Delegate */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">
                Manually Assign to Other Department
              </h2>

              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                disabled={updating}
              >
                <option>Roads & Infrastructure</option>
                <option>Water Supply</option>
                <option>Electrical Department</option>
                <option>Sanitation & Waste</option>
                <option>General</option>
              </select>

              <button
                onClick={handleManualDelegate}
                disabled={updating}
                className="w-full bg-teal-600 text-white py-2 rounded-lg text-sm
                           hover:bg-teal-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Assigning..." : "Assign Complaint"}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold">Quick Actions</h2>

              <ActionBtn
                icon={<AlertTriangle className="text-orange-500" />}
                label="Mark as Acknowledged"
                onClick={() =>
                  updateStatusQuickly(
                    "In Progress",
                    "Complaint acknowledged by department"
                  )
                }
                disabled={updating}
              />

              <ActionBtn
                icon={<CheckCircle className="text-green-600" />}
                label="Mark as Resolved"
                onClick={() =>
                  updateStatusQuickly(
                    "Resolved",
                    "Complaint marked as resolved"
                  )
                }
                disabled={updating}
              />

              <ActionBtn
                icon={<AlertTriangle className="text-red-500" />}
                label="Mark as Critical"
                onClick={() =>
                  updateStatusQuickly(
                    "Critical",
                    "Complaint escalated as critical"
                  )
                }
                disabled={updating}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable Components */

function Detail({ icon, title, value }) {
  return (
    <div className="flex gap-3">
      <div className="p-2 rounded-lg bg-gray-100 text-gray-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-medium">{value || "N/A"}</p>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-3 border border-gray-200 px-4 py-2 rounded-lg text-sm
                 hover:bg-gray-50 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({ label, value, color }) {
  return (
    <div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}