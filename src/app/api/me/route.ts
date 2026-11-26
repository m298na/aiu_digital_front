import { NextResponse } from "next/server";
import { requireSession } from "@/lib/access";

export async function GET() {
  const { session, error } = await requireSession();
  if (error || !session) return error!;

  return NextResponse.json({
    name: session.user.name,
    email: session.user.email,
    roles: session.user.roles,
    activeRole: session.user.activeRole,
  });
}
