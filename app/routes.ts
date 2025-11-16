import { type RouteConfig, route } from "@react-router/dev/routes";
import { redirect } from "react-router";

export default [
  {
    index: true,
    file: "routes/home.tsx",
    loader: () => redirect("/dashboard"),
  },
  route("dashboard", "routes/dashboard.tsx"),
  route("routes", "routes/routes.tsx"),
  route("fleet", "routes/fleet.tsx"),
  route("live-map", "routes/live-map.tsx"),
] satisfies RouteConfig;
