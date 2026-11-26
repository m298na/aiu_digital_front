import { NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { scienceStore } from "@/lib/data/store";

export async function GET() {
  const { error } = await requireRole(["admin", "specialist"]);
  if (error) return error;
  return NextResponse.json({ items: scienceStore });
}
