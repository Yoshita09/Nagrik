import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

/* ---------------- EMOJI ICON GENERATOR ---------------- */
const emojiIcon = (emoji, bg) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        background:${bg};
        width:34px;
        height:34px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:18px;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
      ">
        ${emoji}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
  });

/* ---------------- STATUS + CATEGORY CONFIG ---------------- */
const iconConfig = {
  pothole: {
    emoji: "🕳️",
    color: {
      Critical: "#FECACA",
      Pending: "#FEF3C7",
      "In Progress": "#FED7AA",
      Resolved: "#BBF7D0",
    },
  },
  streetlight: {
    emoji: "💡",
    color: { Pending: "#FEF3C7" },
  },
  garbage: {
    emoji: "🗑️",
    color: { "In Progress": "#FED7AA" },
  },
  water: {
    emoji: "💧",
    color: { Pending: "#DBEAFE" },
  },
  sewage: {
    emoji: "🚽",
    color: { Resolved: "#BBF7D0" },
  },
};

/* ---------------- GEO DATA ---------------- */
const issuesData = [
  {
    id: 1,
    title: "Large pothole on MG Road",
    area: "MG Road, Near Metro Station",
    type: "pothole",
    status: "Critical",
    lat: 28.5206,
    lng: 77.2019,
  },
  {
    id: 2,
    title: "Streetlight not working",
    area: "Brigade Road, Sector 4",
    type: "streetlight",
    status: "Pending",
    lat: 28.6519,
    lng: 77.1909,
  },
  {
    id: 3,
    title: "Garbage overflow at bin",
    area: "Residency Road, Block B",
    type: "garbage",
    status: "In Progress",
    lat: 28.5677,
    lng: 77.2433,
  },
  {
    id: 4,
    title: "Water pipeline leak",
    area: "Lavelle Road, Near Park",
    type: "water",
    status: "Pending",
    lat: 28.6315,
    lng: 77.2167,
  },
  {
    id: 5,
    title: "Sewage blockage",
    area: "Richmond Road, Junction",
    type: "sewage",
    status: "Resolved",
    lat: 28.5921,
    lng: 77.046,
  },
  {
    id: 6,
    title: "Multiple potholes on inner road",
    area: "Church Street, Lane 3",
    type: "pothole",
    status: "Pending",
    lat: 28.636,
    lng: 77.225,
  },
];

export default function Ward_map() {
  const [filter, setFilter] = useState("all");

  const filteredIssues =
    filter === "all" ? issuesData : issuesData.filter((i) => i.type === filter);

  return (
    <div className="h-[calc(100vh-80px)] flex bg-gray-50">
      {/* ---------------- MAP SECTION ---------------- */}
      <div className="flex-1 relative">
        {/* FILTER BAR */}
        <div
          className="
  absolute top-4 left-1/2 -translate-x-1/2 z-[1000]
  flex flex-nowrap items-center gap-2
  bg-white px-4 py-2 rounded-full shadow-lg 
  overflow-x-auto max-w-[95%]
"
        >
          {[
            { key: "all", label: "📍 All Issues" },
            { key: "pothole", label: "🕳️ Potholes" },
            { key: "streetlight", label: "💡 Streetlights" },
            { key: "garbage", label: "🗑️ Garbage" },
            { key: "water", label: "💧 Water Leaks" },
            { key: "sewage", label: "🚽 Sewage" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`
        whitespace-nowrap
        px-4 py-1.5 rounded-full text-sm font-medium border transition
        ${
          filter === f.key
            ? "bg-teal-600 text-white border-teal-600"
            : "bg-white hover:bg-gray-100"
        }
      `}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* MAP */}
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={11}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />

          {filteredIssues.map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={emojiIcon(
                iconConfig[issue.type].emoji,
                iconConfig[issue.type].color[issue.status],
              )}
            >
              <Popup>
                <p className="font-semibold">{issue.title}</p>
                <p className="text-sm">{issue.area}</p>
                <p className="text-xs mt-1">
                  {iconConfig[issue.type].emoji} {issue.status}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* STATUS LEGEND */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 text-sm z-[1000]">
          <p className="font-semibold mb-2">Issue Status</p>
          <Legend color="bg-red-400" label="Critical" />
          <Legend color="bg-yellow-400" label="Pending" />
          <Legend color="bg-orange-400" label="In Progress" />
          <Legend color="bg-green-400" label="Resolved" />
        </div>
      </div>

      {/* ---------------- RIGHT PANEL ---------------- */}
      <div className="w-[360px] bg-white border-l overflow-y-auto p-4">
        <h3 className="font-semibold text-lg mb-4">Issues (All)</h3>

        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="p-4 mb-3 border rounded-xl hover:shadow-md transition cursor-pointer"
          >
            <div className="flex gap-3">
              <div className="text-xl">{iconConfig[issue.type].emoji}</div>

              <div>
                <p className="font-medium">{issue.title}</p>
                <p className="text-xs text-gray-500">{issue.area}</p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      issue.status === "Critical"
                        ? "bg-red-100 text-red-600"
                        : issue.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : issue.status === "In Progress"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                    }`}
                  >
                    {issue.status}
                  </span>

                  {(issue.type === "pothole" || issue.type === "garbage") && (
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs">
                      AI
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- LEGEND ITEM ---------------- */
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}