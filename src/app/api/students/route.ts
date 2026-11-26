import { NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { studentsStore } from "@/lib/data/store";

export async function GET() {
  const { error } = await requireRole(["admin"]);
  if (error) return error;
  return NextResponse.json({ items: studentsStore });
}
