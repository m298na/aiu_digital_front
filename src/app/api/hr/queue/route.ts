import { NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { listHrQueue } from "@/lib/api/server";

export async function GET() {
  const { error } = await requireRole(["specialist"]);
  if (error) return error;
  return NextResponse.json({ items: listHrQueue() });
}
