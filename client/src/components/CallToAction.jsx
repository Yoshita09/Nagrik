import { AlertCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CallToAction() {
  const navigate = useNavigate();
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold">
          Ready to Transform Your City?
        </h2>

        <p className="mt-3 text-teal-100">
          Join thousands of active citizens making their communities better every day.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button 
          onClick={() => navigate("/report")}
          className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl shadow hover:scale-105 transition">
            <AlertCircle size={18} />
            Report an Issue
          </button>

          <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition">
            <User size={18} />
            View Profile
          </button>
        </div>

      </div>
    </section>
  );
}