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
  LogOut,
  FileExclamationPointIcon,
} from "lucide-react";
import { useState } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useUser();

  const role = localStorage.getItem("role"); // citizen | government
  if (!isLoaded) return null;

  /* ---------------- ROLE BASED NAV ITEMS ---------------- */

  const navItems = [
    ...(user
      ? [{ path: "/", label: "Home", icon: Home }]
      : []),

    ...(user && role === "citizen"
      ? [
          { path: "/ai", label: "AI Assistant", icon: Bot },
          { path: "/report", label: "Report Issue", icon: AlertTriangle },
          { path: "/ward-map", label: "Ward Map", icon: MapPin },
          { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { path: "/profile", label: "Profile", icon: User },
        ]
      : []),

    ...(user && role === "government"
      ? [
          { path: "/ward-map", label: "Ward Map", icon: MapPin },
          {
            path: "/gov-complaints",
            label: "Complaint Box",
            icon: FileExclamationPointIcon,
          },
          { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ]
      : []),
  ];

  /* ---------------- UI ---------------- */

  return (
    <nav className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-[auto_1fr_auto] items-center">

        {/* LEFT — LOGO */}
        <NavLink
  to="/"
  className="flex items-center gap-2 cursor-pointer"
>
  <img src={logo} alt="Nagrik Logo" className="h-14 object-contain" />
  <span className="text-3xl font-bold bg-[linear-gradient(to_right,#0A4C8B,#0f766e)] bg-clip-text text-transparent">
    Nagrik
  </span>
</NavLink>


        {/* CENTER — NAV (ONLY IF LOGGED IN) */}
        <div className="hidden md:flex justify-center">
          {user && (
            <div className="inline-flex items-center gap-2 flex-nowrap">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={i}
                    to={item.path}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 px-3 py-2 rounded-2xl
                       min-w-max whitespace-nowrap transition
                       ${
                         isActive
                           ? "bg-primary text-white shadow"
                           : "text-gray-700 hover:bg-gray-100"
                       }`
                    }
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT — LOGIN / LOGOUT */}
        <div className="hidden md:flex justify-end">
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

        {/* MOBILE TOGGLE */}
        <button className="md:hidden justify-self-end" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
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
                  `flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition
                   ${
                     isActive
                       ? "bg-primary text-white shadow"
                       : "text-gray-700 hover:bg-gray-100"
                   }`
                }
              >
                <Icon size={20} />
                {item.label}
              </NavLink>
            );
          })}

          {!user && (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              <LogIn size={18} />
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
