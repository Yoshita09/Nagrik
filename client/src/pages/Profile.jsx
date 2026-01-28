import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Star } from "lucide-react";
import MyIssues from "../components/settings/MyIssues";
import Achievements from "../components/settings/Achievements";
import Settings from "../components/settings/Settings";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-500">
            Manage your account and track your civic contributions
          </p>
        </div>

        {/* PROFILE HEADER */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-semibold">
              V
            </div>

            <div>
              <h2 className="text-xl font-semibold">Yoshita Singhal</h2>
              <div className="flex gap-2 text-sm items-center flex-wrap">
                <span className="bg-white/20 px-2 py-0.5 rounded-full">
                  Silver Member
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full">
                  Rank #5
                </span>
              </div>
              <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
                <MapPin size={14} /> Ward 2
              </p>
            </div>
          </div>

          <div className="flex gap-10 text-center">
            <Stat label="Points" value="1420" />
            <Stat label="Reported" value="25" />
            <Stat label="Verified" value="15" />
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-xl shadow-sm p-2 flex justify-between">
          {["Overview", "My Issues", "Achievements", "Settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg font-medium transition
                ${
                  activeTab === tab
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 text-gray-500"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* PERSONAL INFO */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Personal Information</h3>
                <button className="flex items-center gap-1 text-sm text-teal-600 hover:underline">
                  <Edit size={14} /> Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="Full Name" value="Vikram Singh" icon={<User size={16} />} />
                <Info label="Email" value="vikram.singh@email.com" icon={<Mail size={16} />} />
                <Info label="Phone" value="+91 98765 43210" icon={<Phone size={16} />} />
                <Info label="Ward" value="Ward 2" icon={<MapPin size={16} />} />
                <Info label="Address" value="Residency Area, Ward 2, Bangalore" full />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Issue Summary</h3>
                <Summary label="Pending" value="3" color="yellow" />
                <Summary label="In Progress" value="1" color="orange" />
                <Summary label="Resolved" value="0" color="green" />
              </div>

              <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={18} />
                  <p className="font-semibold">Level Progress</p>
                </div>

                <p className="text-sm mb-3">580 points to Gold</p>

                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-[70%]" />
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "My Issues" && <MyIssues />}

        {activeTab === "Achievements" && <Achievements />}

        {activeTab === "Settings" && <Settings />}

      </div>
    </section>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm opacity-80">{label}</p>
    </div>
  );
}

function Info({ label, value, icon, full }) {
  return (
    <div className={`bg-gray-100 rounded-xl p-3 ${full ? "md:col-span-2" : ""}`}>
      <p className="text-xs text-gray-500">{label}</p>
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}

function Summary({ label, value, color }) {
  const styles = {
    yellow: "bg-yellow-100 text-yellow-700",
    orange: "bg-orange-100 text-orange-700",
    green: "bg-green-100 text-green-700",
  };

  return (
    <div className={`flex justify-between items-center p-3 rounded-xl mb-3 ${styles[color]}`}>
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
