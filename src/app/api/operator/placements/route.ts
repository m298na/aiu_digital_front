import { NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { placementsStore } from "@/lib/data/store";

export async function GET() {
  const { error } = await requireRole(["operator"]);
  if (error) return error;
  return NextResponse.json({ items: placementsStore });
}
