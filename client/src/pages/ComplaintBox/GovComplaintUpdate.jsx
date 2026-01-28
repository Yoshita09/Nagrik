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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function GovComplaintUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

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
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center">
              🕳️
            </div>
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-3">
                Large pothole on MG Road
                <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                  Critical
                </span>
              </h1>
              <p className="text-gray-500 text-sm">Complaint ID: {id}</p>
            </div>
          </div>

          <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm">
            AI Detected
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
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
                <p className="font-medium">
                  Dangerous pothole near bus stop causing accidents
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Detail
                  icon={<MapPin />}
                  title="Location"
                  value="MG Road, Near Metro Station"
                  sub="Lat: 12.9716, Lng: 77.5946"
                />

                <Detail
                  icon={<Building2 />}
                  title="Ward Number"
                  value="Ward 1"
                />

                <Detail
                  icon={<User />}
                  title="Reported By"
                  value="Citizen123"
                />

                <Detail
                  icon={<Calendar />}
                  title="Reported On"
                  value="05/01/2024"
                />

                <Detail
                  icon={<Building2 />}
                  title="Current Department"
                  value="Roads & Infrastructure"
                />
              </div>

              <div className="flex gap-10 pt-4 border-t border-gray-200">
                <Stat label="Upvotes" value="45" color="text-teal-600" />
                <Stat
                  label="Repeat Reports"
                  value="5"
                  color="text-orange-500"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">Update Timeline</h2>

              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="bg-yellow-100 text-yellow-600 text-xs px-3 py-1 rounded-full">
                    Pending
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    05/01/2024, 05:30 PM
                  </p>
                  <p className="text-sm">Issue reported by citizen</p>
                  <p className="text-xs text-gray-400">
                    Updated by: Citizen123
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Update Status */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">Update Status</h2>

              <div>
                <label className="text-sm text-gray-500">New Status</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1">
                  <option>Critical</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Update Note (Optional)
                </label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                  rows={3}
                  placeholder="Add a note about this status change..."
                />
              </div>

              <button className="w-full bg-teal-600 text-white py-3 rounded-lg flex justify-center gap-2 hover:bg-teal-700">
                <CheckCircle size={18} /> Update Status
              </button>
            </div>

            {/* Delegate */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold">Delegate to Department</h2>

              <button className="w-full border border-gray-200 py-2 rounded-lg text-sm">
                AI Auto-Detect Department
              </button>

              <div>
                <label className="text-sm text-gray-500">
                  Select Department
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1">
                  <option>Roads & Infrastructure</option>
                  <option>Water Supply</option>
                  <option>Electrical Department</option>
                </select>
              </div>

              <button className="w-full bg-gray-100 py-2 rounded-lg text-sm text-gray-600">
                Delegate Complaint
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-semibold">Quick Actions</h2>

              <ActionBtn
                icon={<AlertTriangle className="text-orange-500" />}
                label="Mark as Acknowledged"
              />

              <ActionBtn
                icon={<CheckCircle className="text-green-600" />}
                label="Mark as Resolved"
              />

              <ActionBtn
                icon={<AlertTriangle className="text-red-500" />}
                label="Mark as Critical"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reusable Components */

function Detail({ icon, title, value, sub }) {
  return (
    <div className="flex gap-3">
      <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-medium">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
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

function ActionBtn({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
      {icon}
      {label}
    </button>
  );
}
