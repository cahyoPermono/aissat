import type { Route } from "./+types/routes";
import { Routes } from "../components/Routes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Routes - Pelindo AIS Sat" },
    { name: "description", content: "Route management for Pelindo AIS Satellite" },
  ];
}

export default function RoutesPage() {
  return <Routes />;
}
