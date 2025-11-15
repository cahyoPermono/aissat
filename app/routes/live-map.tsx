import type { Route } from "./+types/live-map";
import { LiveMap } from "../components/LiveMap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Live Map - Pelindo AIS Sat" },
    { name: "description", content: "Live tracking map for Pelindo AIS Satellite" },
  ];
}

export default function LiveMapPage() {
  return <LiveMap />;
}
