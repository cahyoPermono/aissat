import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("routes", "routes/routes.tsx"),
  route("fleet", "routes/fleet.tsx"),
  route("live-map", "routes/live-map.tsx"),
] satisfies RouteConfig;
