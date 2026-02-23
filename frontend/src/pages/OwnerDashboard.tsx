/**
 * @file OwnerDashboard.tsx
 * @description Owner's dashboard with sidebar nav and sub-routes.
 *
 * Routes:
 *   /dashboard/owner           → Overview (stats + charts)
 *   /dashboard/owner/analytics → Full analytics view
 *   /dashboard/owner/services  → Service catalogue (full CRUD)
 *   /dashboard/owner/artists   → Artist directory (CRUD)
 *   /dashboard/owner/team      → Team management (CRUD users)
 */

import { Routes, Route } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Scissors,
  Users,
  Palette,
  CalendarPlus,
} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardOverview from "@/pages/dashboard/shared/DashboardOverview";
import DashboardAnalyticsView from "@/pages/dashboard/shared/DashboardAnalyticsView";
import ServiceManagement from "@/pages/dashboard/ServiceManagement";
import TeamManagement from "@/pages/dashboard/TeamManagement";
import ArtistManagement from "@/pages/dashboard/ArtistManagement";

const ownerLinks = [
  { to: "/dashboard/owner", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/owner/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/owner/services", label: "Services", icon: Scissors },
  { to: "/dashboard/owner/artists", label: "Artists", icon: Palette },
  { to: "/dashboard/owner/team", label: "Team", icon: Users },
  { to: "/visit-entry", label: "New Visit Entry", icon: CalendarPlus },
];

export default function OwnerDashboard() {
  return (
    <DashboardLayout sidebarLinks={ownerLinks} pageTitle="Owner Dashboard">
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="analytics" element={<DashboardAnalyticsView />} />
        <Route path="services" element={<ServiceManagement />} />
        <Route path="artists" element={<ArtistManagement />} />
        <Route path="team" element={<TeamManagement />} />
      </Routes>
    </DashboardLayout>
  );
}
