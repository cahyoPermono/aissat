import { Link, useLocation } from "react-router";
import { LayoutDashboard, Map, Ship, Route, AlertTriangle, BarChart, Settings } from 'lucide-react';

const navLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/live-map", icon: Map, label: "Live Map" },
  { to: "/fleet", icon: Ship, label: "Fleet" },
  { to: "/routes", icon: Route, label: "Routes" },
  { to: "/voyages", icon: Ship, label: "Voyages" },
  { to: "/alerts", icon: AlertTriangle, label: "Alerts" },
  { to: "/analytics", icon: BarChart, label: "Analytics" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/") return true; // Treat home as dashboard
    if (location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="w-64 bg-[#0A1E3C] text-white flex flex-col">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Ship size={20} />
          </div>
          <span className="text-xl font-bold">ShipTrack</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-2">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              isActive(link.to)
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-700 hover:text-white"
            }`}
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-4">
            <img src="https://i.pravatar.cc/40" alt="User" className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold">John Anderson</p>
                <p className="text-sm text-gray-400">Fleet Manager</p>
            </div>
        </div>
      </div>
    </div>
  );
}