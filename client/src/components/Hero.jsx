import { MessageSquare, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-bgsoft to-white py-24 text-center px-6">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1 bg-teal-50 text-primary rounded-full text-sm font-medium shadow-sm">
        <span className="w-2 h-2 rounded-full bg-primary"></span>
        AI-Powered Civic Governance Platform
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-bold leading-tight mt-8 max-w-4xl mx-auto">
        Transforming Cities with <br />
        <span className="text-primary">Intelligent Civic Solutions</span>
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
        Report issues using voice or text, track resolutions in real-time, and make
        your community better through AI-powered governance.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-5 mt-10">
        <button
          onClick={() => navigate("/report")}
          className="flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-xl shadow-soft hover:scale-105 transition"
        >
          <MessageSquare size={18} />
          Start Reporting
        </button>

        <button
          onClick={() => navigate("/ward-map")}
          className="flex items-center gap-2 border border-gray-300 px-7 py-3 rounded-xl hover:bg-gray-50 transition"
        >
          <Map size={18} />
          View Ward Map
        </button>
      </div>

    </section>
  );
}
