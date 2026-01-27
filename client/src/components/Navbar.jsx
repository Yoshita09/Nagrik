import { NavLink } from "react-router-dom";
import {
  Home,
  Bot,
  MapPin,
  AlertTriangle,
  LayoutDashboard,
  User,
  Menu,
  X,
  LogIn,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useUser();

  const role = localStorage.getItem("role"); // ✅ citizen | government

  if (!isLoaded) return null;

  const navItems = [
    { path: "/", label: "Home", icon: Home },

    // Citizen only
    ...(role === "citizen"
      ? [
          { path: "/ai", label: "AI Assistant", icon: Bot },
          { path: "/report", label: "Report Issue", icon: AlertTriangle },
          { path: "/ward-map", label: "Ward Map", icon: MapPin },
          { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { path: "/profile", label: "Profile", icon: User },
        ]
      : []),

    // Government only
    ...(role === "government"
      ? [
          { path: "/ward-map", label: "Ward Map", icon: MapPin },
          { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ]
      : []),
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
        <div className="hidden md:flex gap-2 text-sm font-medium items-center">
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

          {/* Login / Logout */}
          {!user ? (
            <NavLink
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              <LogIn size={18} />
              Login
            </NavLink>
          ) : (
            <SignOutButton>
              <button
                onClick={() => localStorage.removeItem("role")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </SignOutButton>
          )}
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

          {/* Login / Logout (Mobile) */}
          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              <LogIn size={18} />
              Login
            </NavLink>
          ) : (
            <SignOutButton>
              <button
                onClick={() => {
                  localStorage.removeItem("role");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </SignOutButton>
          )}
        </div>
      )}
    </nav>
  );
}
