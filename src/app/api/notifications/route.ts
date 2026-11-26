import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/access";
import { listNotifications } from "@/lib/api/server";

export async function GET(request: NextRequest) {
  const { error } = await requireSession();
  if (error) return error;

  const tab = request.nextUrl.searchParams.get("tab") === "unread" ? "unread" : "all";
  return NextResponse.json({ items: listNotifications(tab) });
}
