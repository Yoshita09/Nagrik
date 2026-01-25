import { useState } from "react";
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
} from "lucide-react";

export default function WaterLeak() {
  const [upvotes, setUpvotes] = useState(32);

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                💧
              </div>

              <div>
                <div className="flex gap-2 mb-1 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                    ● High
                  </span>
                </div>

                <h2 className="text-xl font-semibold">
                  Water pipeline leak
                </h2>
                <p className="text-sm text-gray-500">Ticket ID: #ISS-004</p>
              </div>
            </div>

            <p className="mt-4 text-gray-600">
              Major water wastage from broken pipeline.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Info icon={MapPin} label="Location" value="Lavelle Road, Near Park, Ward 2" />
              <Info icon={AlertCircle} label="Department" value="Water Supply" />
              <Info icon={Calendar} label="Reported On" value="January 12, 2024" />
              <Info icon={User} label="Reported By" value="Citizen101" />
            </div>
          </div>

          {/* TIMELINE */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-5">Resolution Timeline</h3>

            <Timeline icon={CheckCircle} title="Reported" time="Jan 12, 2024 — 5:30 AM" active />
            <Timeline icon={CheckCircle} title="Acknowledged" time="Jan 12, 2024 — 6:30 AM" active />
            <Timeline icon={Loader} title="In Progress" />
            <Timeline icon={Clock} title="Resolved" />
          </div>

          {/* COMMENTS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
              <MessageSquare size={18} /> Comments & Updates
            </h3>

            <div className="bg-gray-50 p-4 rounded-xl mb-5">
              <p className="font-medium">Municipal Corporation</p>
              <p className="text-xs text-gray-500">Official Response</p>
              <p className="text-sm text-gray-600 mt-2">
                Your complaint has been received and assigned to the Water Supply Department.
                Expected resolution within 7 working days.
              </p>
            </div>

            <textarea
              rows="4"
              placeholder="Add a comment or update..."
              className="w-full border rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none"
            />

            <button className="mt-4 bg-primary text-white px-5 py-2 rounded-xl hover:scale-105 transition">
              Submit Comment
            </button>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* ACTIONS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Actions</h3>

            <button
              onClick={() => setUpvotes(prev => prev + 1)}
              className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl mb-3
                         text-gray-700 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50
                         transition-all duration-200"
            >
              <ThumbsUp size={18} />
              Upvote ({upvotes})
            </button>

            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl mb-3
                         text-gray-700 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50
                         transition-all duration-200"
            >
              <Share2 size={18} />
              Share Issue
            </button>

            <button
              className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl
                         text-orange-600 border-orange-200 hover:bg-orange-50
                         transition-all duration-200"
            >
              <Flag size={18} />
              Flag as Duplicate
            </button>
          </div>

          {/* STATS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Issue Stats</h3>
            <Stat label="Time since reported" value="about 2 years" />
            <Stat label="Category" value="Water Leak" />
            <Stat label="Similar Issues" value="0" />
            <Stat label="Ward Issues" value="2" />
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
      <div className={`w-9 h-9 flex items-center justify-center rounded-full 
        ${active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
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