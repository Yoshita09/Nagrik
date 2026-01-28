import {
  AlertTriangle,
  Lightbulb,
  Trash2,
  Droplet
} from "lucide-react";

export default function MyIssues() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg">My Reported Issues</h3>
        <p className="text-gray-500 text-sm">
          Track the status of issues you've reported
        </p>
      </div>

      {/* ISSUES LIST */}
      <div className="space-y-4">

        <IssueCard
          icon={<AlertTriangle className="text-red-500" />}
          title="Large pothole on MG Road"
          desc="Dangerous pothole near bus stop causing accidents"
          id="ISS-001"
          location="MG Road, Near Metro Station"
          date="1/5/2024"
          status="Critical"
          statusStyle="bg-red-100 text-red-600"
        />

        <IssueCard
          icon={<Lightbulb className="text-yellow-500" />}
          title="Streetlight not working"
          desc="Street lamp out for 2 weeks, safety concern at night"
          id="ISS-002"
          location="Brigade Road, Sector 4"
          date="1/8/2024"
          status="Pending"
          statusStyle="bg-yellow-100 text-yellow-700"
        />

        <IssueCard
          icon={<Trash2 className="text-orange-500" />}
          title="Garbage overflow at bin"
          desc="Community bin overflowing, attracting stray animals"
          id="ISS-003"
          location="Residency Road, Block B"
          date="1/10/2024"
          status="In Progress"
          statusStyle="bg-orange-100 text-orange-600"
        />

        <IssueCard
          icon={<Droplet className="text-blue-500" />}
          title="Water pipeline leak"
          desc="Major water wastage from broken pipeline"
          id="ISS-004"
          location="Lavelle Road, Near Park"
          date="1/12/2024"
          status="Pending"
          statusStyle="bg-yellow-100 text-yellow-700"
        />

      </div>

    </div>
  );
}

/* ---------------- ISSUE CARD ---------------- */

function IssueCard({
  icon,
  title,
  desc,
  id,
  location,
  date,
  status,
  statusStyle
}) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center hover:shadow-sm transition">

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-gray-500 text-sm">{desc}</p>

          <div className="text-xs text-gray-400 flex gap-3 mt-1">
            <span>{id}</span>
            <span>{location}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}
      >
        {status}
      </span>

    </div>
  );
}