"use client";

/**
 * Thin adapter over Auth.js. Session lives in an httpOnly cookie — never localStorage.
 */
import { useSession as useAuthSession, signIn, signOut } from "next-auth/react";
import type { Role } from "@/lib/types";

export function useSession() {
  const { data, status, update } = useAuthSession();
  const ready = status !== "loading";
  const signedIn = status === "authenticated" && Boolean(data?.user);
  const role = data?.user?.activeRole ?? null;
  const roles = data?.user?.roles ?? [];

  return {
    ready,
    signedIn,
    role,
    roles,
    user: data?.user ?? null,
    status,
    signInDev: (profileId: string) =>
      signIn("dev-sso", { profileId, callbackUrl: "/role" }),
    signInOidc: () => signIn("aiu-oidc", { callbackUrl: "/role" }),
    signOut: () => signOut({ callbackUrl: "/" }),
    setRole: async (next: Role) => {
      if (!roles.includes(next)) {
        throw new Error("Role is not granted to this account");
      }
      await update({ activeRole: next });
    },
  };
}

export { AuthProvider } from "@/components/providers/auth-provider";
