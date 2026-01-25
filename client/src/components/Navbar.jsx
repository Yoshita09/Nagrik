import { NavLink } from "react-router-dom";
import {
  Home,
  Bot,
  MapPin,
  AlertTriangle,
  LayoutDashboard,
  User
} from "lucide-react";
import logo from "../assets/logo.png";


export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
  <img
    src={logo}
    alt="Nagrik Logo"
    className=" h-12 rounded-xl object-contain"
  />
  <span className="text-lg font-bold">Nagrik</span>
</div>


        {/* Nav Links */}
        <div className="flex gap-2 text-sm font-medium">
          {[
            { path: "/", label: "Home", icon: Home },
            { path: "/ai", label: "AI Assistant", icon: Bot },
            { path: "/ward", label: "Ward Map", icon: MapPin },
            { path: "/report", label: "Report Issue", icon: AlertTriangle },
            { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { path: "/profile", label: "Profile", icon: User },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl transition
                  ${isActive
                    ? "bg-primary text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </div>

      </div>
    </nav>
  );
}