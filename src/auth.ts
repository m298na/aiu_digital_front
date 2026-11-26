import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { allowDevLogin, oidcConfigured } from "@/lib/config";
import { getDemoProfile } from "@/lib/auth/demo-profiles";
import { isRole, parseRoles, type Role } from "@/lib/types";
import { z } from "zod";

declare module "next-auth" {
  interface User {
    roles: Role[];
    activeRole: Role | null;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: Role[];
      activeRole: Role | null;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    roles?: Role[];
    activeRole?: Role | null;
  }
}

const devLoginSchema = z.object({
  profileId: z.string().min(1),
});

function buildProviders(): Provider[] {
  const providers: Provider[] = [];

  if (oidcConfigured()) {
    providers.push({
      id: "aiu-oidc",
      name: "University SSO",
      type: "oidc",
      issuer: process.env.AUTH_OIDC_ISSUER!,
      clientId: process.env.AUTH_OIDC_CLIENT_ID!,
      clientSecret: process.env.AUTH_OIDC_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: process.env.AUTH_OIDC_SCOPE || "openid profile email roles",
        },
      },
      profile(profile) {
        const roles = parseRoles(
          profile.roles ??
            profile.aiu_roles ??
            profile["https://aiu.edu.kz/roles"],
        );
        return {
          id: String(profile.sub),
          name: profile.name ?? profile.preferred_username ?? "User",
          email: profile.email,
          roles,
          activeRole: roles[0] ?? null,
        };
      },
    } satisfies Provider);
  }

  if (allowDevLogin()) {
    providers.push(
      Credentials({
        id: "dev-sso",
        name: "Dev SSO",
        credentials: {
          profileId: { label: "Profile", type: "text" },
        },
        authorize(credentials) {
          const parsed = devLoginSchema.safeParse(credentials);
          if (!parsed.success) return null;
          const profile = getDemoProfile(parsed.data.profileId);
          if (!profile) return null;
          return {
            id: `demo:${profile.id}`,
            name: profile.name,
            email: profile.email,
            roles: profile.roles,
            activeRole: profile.roles[0] ?? null,
          };
        },
      }),
    );
  }

  return providers;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: buildProviders(),
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.roles = user.roles ?? [];
        token.activeRole = user.activeRole ?? user.roles?.[0] ?? null;
      }

      if (trigger === "update" && session) {
        const nextRole = session.activeRole;
        const granted = parseRoles(token.roles);
        if (isRole(nextRole) && granted.includes(nextRole)) {
          token.activeRole = nextRole;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.roles = parseRoles(token.roles);
      session.user.activeRole =
        token.activeRole && isRole(token.activeRole)
          ? token.activeRole
          : session.user.roles[0] ?? null;
      return session;
    },
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl;
      if (
        pathname.startsWith("/api/auth") ||
        pathname === "/" ||
        pathname.startsWith("/_next") ||
        pathname === "/favicon.ico"
      ) {
        return true;
      }
      return !!session?.user;
    },
  },
});
