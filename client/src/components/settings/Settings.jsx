import { Bell, Lock, LogOut } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    status: true,
    ward: false,
    points: true,
  });

  return (
    <div className="space-y-6">

      {/* NOTIFICATIONS */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Bell size={18} /> Notification Preferences
        </h3>

        <ToggleRow
          label="Issue status updates"
          desc="Get notified when your reported issues change status"
          enabled={notifications.status}
          onToggle={() =>
            setNotifications({ ...notifications, status: !notifications.status })
          }
        />

        <ToggleRow
          label="Ward announcements"
          desc="Receive updates about your ward"
          enabled={notifications.ward}
          onToggle={() =>
            setNotifications({ ...notifications, ward: !notifications.ward })
          }
        />

        <ToggleRow
          label="Points & achievements"
          desc="Notifications for earned points and unlocked badges"
          enabled={notifications.points}
          onToggle={() =>
            setNotifications({ ...notifications, points: !notifications.points })
          }
        />
      </div>

      {/* SECURITY */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Lock size={18} /> Account Security
        </h3>

        <button
          className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl mb-3
                     hover:bg-gray-50 transition"
        >
          <Lock size={18} className="text-gray-600" />
          Change Password
        </button>

        <button
          className="w-full flex items-center gap-3 border px-4 py-3 rounded-xl
                     text-red-600 border-red-200 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

    </div>
  );
}

/* ---------------- TOGGLE ROW ---------------- */

function ToggleRow({ label, desc, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>

      <button
        onClick={onToggle}
        className={`px-4 py-1.5 rounded-full border font-medium text-sm transition
          ${enabled
            ? "bg-teal-600 text-white border-teal-600"
            : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
      >
        {enabled ? "Enabled" : "Enable"}
      </button>
    </div>
  );
}