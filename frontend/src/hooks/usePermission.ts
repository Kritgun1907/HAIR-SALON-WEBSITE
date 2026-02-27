/**
 * @file usePermission.ts
 * @description Tiny hook for PBAC checks — reads from AuthContext, never hits the API.
 *
 * - Owner role always returns true (exempt from PBAC).
 * - All other roles (including artist): checks user.permissions[].
 *
 * Usage:
 *   const canViewAnalytics = usePermission('analytics.view');
 *   if (!canViewAnalytics) return null;
 */

import { useAuth } from "../context/AuthContext";

export function usePermission(key: string): boolean {
  const { user } = useAuth();
  if (!user) return false;
  if (user.role === "owner") return true; // owner is always exempt
  return user.permissions.includes(key);
}
