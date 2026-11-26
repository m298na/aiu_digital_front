import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { listEmployees } from "@/lib/api/server";

export async function GET(request: NextRequest) {
  const { error } = await requireRole(["specialist"]);
  if (error) return error;

  const items = listEmployees({
    q: request.nextUrl.searchParams.get("q") ?? undefined,
    unit: request.nextUrl.searchParams.get("unit") ?? undefined,
  });
  return NextResponse.json({ items });
}
