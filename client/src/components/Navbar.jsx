import { NavLink } from "react-router-dom";
import {
  Home,
  Bot,
  MapPin,
  AlertTriangle,
  LayoutDashboard,
  User,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/ai", label: "AI Assistant", icon: Bot },
    { path: "/ward", label: "Ward Map", icon: MapPin },
    { path: "/report", label: "Report Issue", icon: AlertTriangle },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Nagrik Logo"
            className="h-12 rounded-xl object-contain"
          />
          <span className="text-lg font-bold">Nagrik</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2 text-sm font-medium">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl transition
                  ${
                    isActive
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
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
      )}
    </nav>
  );
}
