import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";


export default function ReportSuccess({ form, onBack, complaintId }) {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md text-center">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={36} className="text-green-600" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-1">Issue Reported!</h2>
        <p className="text-gray-500 mb-6">
          Your complaint has been successfully registered.
        </p>

        {/* ✅ FULL SUPABASE ID */}
        <div className="bg-gray-100 rounded-xl py-4 mb-6">
          <p className="text-sm text-gray-500">Complaint ID</p>

          <p className="text-sm font-mono break-all text-teal-700">
            {complaintId ? complaintId : "Error: ID not found"}
          </p>
        </div>

        {/* DETAILS */}
        <div className="text-sm mb-6 space-y-2 text-left">
          <Row label="Category" value={form.category} />
          <Row label="Ward" value={form.ward || "Not specified"} />
          <Row label="Priority" value="AI Assigned" color="text-orange-500" />
          <Row label="Est. Resolution" value="3–5 days" />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 bg-orange-500 text-white py-3 rounded-xl"
          >
            Report Another
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-teal-600 text-white py-3 rounded-xl"
          >
            Report Analysis
          </button>
        </div>

      </div>
    </section>
  );
}

function Row({ label, value, color = "text-gray-800" }) {
  return (
    <div className="flex justify-between border-b pb-2 last:border-b-0">
      <span className="text-gray-500">{label}</span>
      <span className={`font-medium ${color}`}>{value}</span>
    </div>
  );
}