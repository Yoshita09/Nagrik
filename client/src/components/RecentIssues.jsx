import { useEffect, useState } from "react";
import IssueCard from "./IssueCard";
import { supabase } from "../lib/supabase";

export default function RecentIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchRecentIssues();
  }, []);

  const fetchRecentIssues = async () => {
    // 1. Fetch latest 6 complaints
    const { data: complaintsData, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Error fetching recent issues:", error);
      return;
    }

    // 2. Fetch complaint updates
    const { data: updatesData, error: updatesError } = await supabase
      .from("complaint_update")
      .select("complaint_id, status, created_at")
      .order("created_at", { ascending: false });

    if (updatesError) {
      console.error("Error fetching complaint updates:", updatesError);
    }

    // 3. Make latest status map by complaint_id
    const latestStatusMap = {};

    updatesData?.forEach((update) => {
      if (!latestStatusMap[update.complaint_id]) {
        latestStatusMap[update.complaint_id] = update.status;
      }
    });

    // 4. Format issues (ONLY status changes)
    const formattedIssues = complaintsData.map((item) => {
      const finalStatus = latestStatusMap[item.id] || item.status;

      return {
        title: item.title,
        id: `#${item.id}`,
        desc: item.description,

        // ✅ only status-based things updated
        priority: getPriority(finalStatus),
        priorityStyle: getPriorityStyle(finalStatus),
        status: finalStatus,
        statusStyle: getStatusStyle(finalStatus),

        // ✅ everything else stays from complaints table
        category: mapCategory(item.department),
        ward: item.ward ? `Ward ${item.ward}` : "Ward N/A",
        time: formatDate(item.created_at),
        votes: item.upvotes ?? 0,
        ai: true,
        icon: getIcon(item.department),
        route: `/complaint/${item.id}`,
      };
    });

    setIssues(formattedIssues);
  };

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Recent Issues</h2>
            <p className="text-gray-600">
              Latest reported civic issues in your city
            </p>
          </div>

          <button className="text-primary font-medium hover:underline flex items-center gap-1">
            View All →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((item, i) => (
            <IssueCard key={i} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HELPERS ---------- */

function getStatusStyle(status) {
  if (status === "Critical") return "bg-red-100 text-red-600";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  if (status === "In Progress") return "bg-orange-100 text-orange-600";
  if (status === "Resolved") return "bg-green-100 text-green-600";
  if (status === "Assigned") return "bg-blue-100 text-blue-600";
  return "bg-gray-100 text-gray-600";
}

function getPriority(status) {
  if (status === "Critical") return "Critical";
  if (status === "Pending") return "High";
  if (status === "In Progress") return "Medium";
  if (status === "Resolved") return "Low";
  if (status === "Assigned") return "Medium";
  return "Medium";
}

function getPriorityStyle(status) {
  if (status === "Critical") return "bg-red-100 text-red-600";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  if (status === "In Progress") return "bg-orange-100 text-orange-600";
  if (status === "Resolved") return "bg-green-100 text-green-600";
  if (status === "Assigned") return "bg-blue-100 text-blue-600";
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
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}