import "server-only";

import { auth } from "@/auth";
import { isRole, type Role } from "@/lib/types";
import { NextResponse } from "next/server";

export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, error: null };
}

export async function requireRole(allowed: Role[]) {
  const { session, error } = await requireSession();
  if (error || !session) return { session: null, error: error! };

  const active = session.user.activeRole;
  if (!active || !allowed.includes(active)) {
    return {
      session,
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { session, error: null };
}

export function assertActiveRoleAllowed(
  granted: Role[],
  active: Role | null | undefined,
): active is Role {
  return Boolean(active && isRole(active) && granted.includes(active));
}

export { homeForRole, canAccessPath } from "@/lib/routing";
