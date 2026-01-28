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
import { complaintsData } from "../../data/complaintsData";

export default function GovComplaintUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const complaint = complaintsData.find((c) => c.id === id);

  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Complaint not found
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={18} /> Back to Complaint Box
        </button>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold flex items-center gap-3">
              {complaint.title}
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                {complaint.status}
              </span>
            </h1>
            <p className="text-gray-500 text-sm">
              Complaint ID: {complaint.id}
            </p>
          </div>

          <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm">
            AI Detected
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Issue Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Issue Details</h2>
                <p className="text-sm text-gray-500">
                  Complete information about this complaint
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{complaint.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Detail icon={<MapPin />} title="Location" value={complaint.location} />
                <Detail icon={<Building2 />} title="Ward Number" value={complaint.ward} />
                <Detail icon={<User />} title="Reported By" value={complaint.reportedBy ?? "Citizen"} />
                <Detail icon={<Calendar />} title="Reported On" value={complaint.date} />
                <Detail icon={<Building2 />} title="Current Department" value={complaint.department} />
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

              <div className="flex gap-4 items-start">
  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
    <Clock size={18} />
  </div>
  <div >
    <span className="bg-yellow-100 text-yellow-600 text-xs px-3 py-1 rounded-full">
      {complaint.status}
    </span>
    <p className="text-sm text-gray-500 mt-1 py-2">
      {complaint.date}
    </p>
    <p className="text-sm">Issue reported by citizen</p>
  </div>
</div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Update Status */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">Update Status</h2>

              <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                <option>Critical</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

              <textarea
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Add a note about this update..."
              />

              <button className="w-full bg-teal-600 text-white py-3 rounded-lg flex justify-center gap-2 hover:bg-teal-700">
                <CheckCircle size={18} /> Update Status
              </button>
            </div>

            {/* ✅ Delegate to Department (RESTORED & SAME UI) */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">Delegate to Department</h2>

              <button className="w-full border border-gray-200 py-2 rounded-lg text-sm">
                AI Auto-Detect Department
              </button>

              <div>
                <label className="text-sm text-gray-500">Select Department</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1">
                  <option>Roads & Infrastructure</option>
                  <option>Water Supply</option>
                  <option>Electrical Department</option>
                  <option>Sanitation & Waste</option>
                </select>
              </div>

              <button className="w-full bg-gray-100 py-2 rounded-lg text-sm text-gray-600">
                Delegate Complaint
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold">Quick Actions</h2>

              <ActionBtn icon={<AlertTriangle className="text-orange-500" />} label="Mark as Acknowledged" />
              <ActionBtn icon={<CheckCircle className="text-green-600" />} label="Mark as Resolved" />
              <ActionBtn icon={<AlertTriangle className="text-red-500" />} label="Mark as Critical" />
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
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
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

