import { NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { getDashboardData } from "@/lib/api/server";

export async function GET() {
  const { error } = await requireRole(["student", "employee"]);
  if (error) return error;
  return NextResponse.json(getDashboardData());
}
