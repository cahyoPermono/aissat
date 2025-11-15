import type { Route } from "./+types/fleet";
import { Fleet } from "../components/Fleet";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fleet - Pelindo AIS Sat" },
    { name: "description", content: "Fleet management for Pelindo AIS Satellite" },
  ];
}

export default function FleetPage() {
  return <Fleet />;
}
