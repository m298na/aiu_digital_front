import { NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { getApplicationById } from "@/lib/api/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireRole(["student", "employee", "specialist"]);
  if (error) return error;

  const { id } = await params;
  const item = getApplicationById(decodeURIComponent(id));
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}
