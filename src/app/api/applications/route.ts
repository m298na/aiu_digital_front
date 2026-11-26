import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { listApplications } from "@/lib/api/server";

export async function GET(request: NextRequest) {
  const { error } = await requireRole(["student", "employee"]);
  if (error) return error;

  const { searchParams } = request.nextUrl;
  const result = listApplications({
    tab: searchParams.get("tab") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    status: searchParams.get("status") ?? undefined,
  });

  return NextResponse.json(result);
}
