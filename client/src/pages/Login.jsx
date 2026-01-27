import { SignInButton, useAuth } from "@clerk/clerk-react";
import { User, Building2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const setRole = (role) => {
    localStorage.setItem("role", role);
  };

  // 🔥 AUTO REDIRECT AFTER LOGIN
  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <section className="min-h-screen bg-white flex p-16 justify-center px-6">
      <div className="max-w-4xl w-full text-center space-y-10">

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Login to <span className="text-primary">Nagrik Platform</span>
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium">
          AI-Powered Civic Governance Platform
        </div>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose your role to continue and access the platform features designed
          specially for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Citizen */}
          <SignInButton mode="modal">
            <button
              onClick={() => setRole("citizen")}
              className="w-full text-left border-2 border-gray-400 rounded-2xl p-6
              transition-all duration-150 hover:bg-teal-50 hover:border-teal-800 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-green-100 text-teal-700">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Citizen Login</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Report issues, track progress, and engage with your city
                  </p>
                </div>
              </div>
            </button>
          </SignInButton>

          {/* Government */}
          <SignInButton mode="modal">
            <button
              onClick={() => setRole("government")}
              className="w-full text-left border-2 border-gray-400 rounded-2xl p-6
              transition-all duration-150 hover:bg-orange-50 hover:border-orange-600 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-orange-100 text-orange-700">
                  <Building2 size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Government Department
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Monitor wards, view dashboards, and manage civic data
                  </p>
                </div>
              </div>
            </button>
          </SignInButton>

        </div>
      </div>
    </section>
  );
}
