import type { Route } from "./+types/dashboard";
import { Dashboard } from "../components/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Pelindo AIS Sat" },
    { name: "description", content: "Dashboard interface for Pelindo AIS Satellite" },
  ];
}

export default function DashboardPage() {
  return <Dashboard />;
}