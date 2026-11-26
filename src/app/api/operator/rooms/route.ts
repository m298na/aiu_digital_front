import { NextResponse } from "next/server";
import { requireRole } from "@/lib/access";
import { roomsStore } from "@/lib/data/store";

export async function GET(request: Request) {
  const { error } = await requireRole(["operator"]);
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const floor = searchParams.get("floor") || "all";

  let items = [...roomsStore];
  if (floor !== "all") {
    items = items.filter((room) => room.startsWith(floor));
  }
  if (q) {
    items = items.filter((room) => room.includes(q));
  }

  return NextResponse.json({ items });
}
