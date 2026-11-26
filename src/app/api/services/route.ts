import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/access";
import { listServices } from "@/lib/api/server";
import { isRole } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { session, error } = await requireSession();
  if (error || !session) return error!;

  const roleParam = request.nextUrl.searchParams.get("role");
  const role =
    roleParam && isRole(roleParam)
      ? roleParam
      : session.user.activeRole ?? undefined;

  const items = listServices({
    q: request.nextUrl.searchParams.get("q") ?? undefined,
    role,
  });

  return NextResponse.json({ items });
}
