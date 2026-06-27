import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  User,
  ThumbsUp,
  Share2,
  Flag,
  CheckCircle,
  Clock,
  Loader,
  AlertCircle,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
const statusColor = {
  Critical: "bg-red-100 text-red-600",
  Pending: "bg-yellow-100 text-yellow-600",
  "In Progress": "bg-orange-100 text-orange-600",
  Resolved: "bg-green-100 text-green-600",
  Assigned: "bg-blue-100 text-blue-600",
};
export default function ComplaintDetails() {
  const [complaint, setComplaint] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchComplaint();
    fetchTimeline();

    const votedComplaints =
      JSON.parse(localStorage.getItem("upvotedComplaints")) || [];

    setHasUpvoted(votedComplaints.includes(id));
  }, [id]);

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
    setUpvotes(data?.upvotes ?? 0);
  };

  const fetchTimeline = async () => {
    const { data, error } = await supabase
      .from("complaint_update")
      .select("*")
      .eq("complaint_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Timeline fetch error:", error);
      return;
    }

    setTimeline(data || []);
  };

  const handleUpvote = async () => {
    let votedComplaints =
      JSON.parse(localStorage.getItem("upvotedComplaints")) || [];

    let newVotes = upvotes;

    if (hasUpvoted) {
      // remove upvote
      newVotes = Math.max(upvotes - 1, 0);
      votedComplaints = votedComplaints.filter((item) => item !== id);
      setHasUpvoted(false);
    } else {
      // add upvote
      newVotes = upvotes + 1;
      votedComplaints.push(id);
      setHasUpvoted(true);
    }

    setUpvotes(newVotes);
    localStorage.setItem("upvotedComplaints", JSON.stringify(votedComplaints));

    const { error } = await supabase
      .from("complaints")
      .update({ upvotes: newVotes })
      .eq("id", id);

    if (error) {
      console.error("Upvote error:", error);
    }
  };

  const latestTimelineStatus =
    timeline.length > 0
      ? timeline[timeline.length - 1].status
      : complaint?.status;

  const latestTimelineDepartment =
    timeline.length > 0
      ? timeline[timeline.length - 1].department
      : complaint?.department;

  const latestComplaintData = {
    ...complaint,
    status: latestTimelineStatus,
    department: latestTimelineDepartment,
  };
  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading complaint details...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6
                     px-3 py-1.5 rounded-lg
                     text-sm text-gray-600
                     hover:bg-gray-100 hover:text-primary
                     transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* HEADER */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  {getIcon(complaint.department)}
                </div>

                <div>
                  <div className="flex gap-2 mb-1 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusColor[latestComplaintData.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {latestComplaintData.status}
                    </span>
                    {/* <span
                      className={`px-3 py-1 rounded-full text-xs ${getPriorityStyle(complaint.status)}`}
                    >
                      ● {getPriority(complaint.status)}
                    </span> */}
                    <span className="px-3 py-1 rounded-full text-xs bg-teal-100 text-primary">
                      AI Detected
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold">{complaint.title}</h2>
                  <p className="text-sm text-gray-500">
                    Ticket ID: #{complaint.id}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                {complaint.description || "No description available"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Info
                  icon={MapPin}
                  label="Location"
                  value={complaint.location || "N/A"}
                />
                <Info
                  icon={AlertCircle}
                  label="Department"
                  value={complaint.department || "General"}
                />
                <Info
                  icon={Calendar}
                  label="Reported On"
                  value={formatDate(complaint.created_at)}
                />
                <Info
                  icon={User}
                  label="Reported By"
                  value={complaint.reported_by || "Citizen"}
                />
              </div>
            </div>

            {/* TIMELINE */}
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

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Updates */}
              {timeline.length > 0 ? (
                [...timeline].reverse().map((t) => (
                  <div key={t.id} className="flex gap-4 items-start">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <Clock size={18} />
                    </div>

                    <div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          statusColor[t.status] || "bg-gray-100 text-gray-600"
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

            {/* COMMENTS */}
            {/* <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <MessageSquare size={18} />
                Comments & Updates
              </h3>

              {timeline.length > 0 ? (
                timeline.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-4 rounded-xl mb-4">
                    <p className="font-medium">
                      {item.department || "Municipal Corporation"}
                    </p>
                    <p className="text-xs text-gray-500">{item.status}</p>
                    <p className="text-sm text-gray-600 mt-2">{item.note}</p>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl mb-5">
                  <p className="font-medium">Municipal Corporation</p>
                  <p className="text-xs text-gray-500">Official Response</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your complaint has been received and assigned to the
                    concerned department.
                  </p>
                </div>
              )}
            </div> */}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* ACTIONS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Actions</h3>

              <button
                onClick={handleUpvote}
                className={`w-full flex items-center gap-3 shadow-md border-b-gray-600 px-4 py-3 rounded-xl mb-3 transition
    ${hasUpvoted ? "bg-orange-50 border-orange-300 text-orange-600" : "hover:bg-orange-50"}`}
              >
                <ThumbsUp size={18} />
                {hasUpvoted ? `Upvoted (${upvotes})` : `Upvote (${upvotes})`}
              </button>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="w-full flex items-center gap-3 shadow-md px-4 py-3 rounded-xl mb-3
                           hover:bg-orange-50 transition"
              >
                <Share2 size={18} />
                Share Issue
              </button>

              <button
                className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl
                           text-orange-600 border-orange-200 hover:bg-orange-50 transition"
              >
                <Flag size={18} />
                Flag as Duplicate
              </button>
            </div>

            {/* STATS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Issue Stats</h3>
              <Stat
                label="Reported On"
                value={formatDate(complaint.created_at)}
              />
              <Stat
                label="Category"
                value={mapCategory(complaint.department)}
              />
              <Stat label="Upvotes" value={upvotes} />
              <Stat label="Ward" value={complaint.ward || "N/A"} />
            </div>

            {/* RELATED */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Related Issues</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">No related issues found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SUB COMPONENTS ---------- */

function Info({ icon: Icon, label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl flex gap-3 items-start">
      <Icon size={18} className="text-primary mt-1" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function Timeline({ icon: Icon, title, time, active }) {
  return (
    <div className="flex gap-4 items-start mb-5">
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full
        ${active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        {time && <p className="text-xs text-gray-500">{time}</p>}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-2 border-b last:border-b-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function getStatusStyle(status) {
  if (status === "Critical") return "bg-red-100 text-red-600";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  if (status === "In Progress") return "bg-orange-100 text-orange-600";
  if (status === "Resolved") return "bg-green-100 text-green-600";
  return "bg-gray-100 text-gray-600";
}

function getPriority(status) {
  if (status === "Critical") return "Critical";
  if (status === "Pending") return "High";
  if (status === "In Progress") return "Medium";
  if (status === "Resolved") return "Low";
  return "Medium";
}

function getPriorityStyle(status) {
  if (status === "Critical") return "bg-red-100 text-red-600";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  if (status === "In Progress") return "bg-orange-100 text-orange-600";
  if (status === "Resolved") return "bg-green-100 text-green-600";
  return "bg-gray-100 text-gray-600";
}

function mapCategory(department) {
  if (department?.includes("Road")) return "Roads";
  if (department?.includes("Electrical")) return "Electricity";
  if (department?.includes("Water")) return "Water";
  if (department?.includes("Sanitation")) return "Sanitation";
  return "General";
}

function getIcon(department) {
  if (department?.includes("Road")) return "🕳";
  if (department?.includes("Electrical")) return "💡";
  if (department?.includes("Water")) return "💧";
  if (department?.includes("Sanitation")) return "🗑";
  return "📍";
}

function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function formatDateTime(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
