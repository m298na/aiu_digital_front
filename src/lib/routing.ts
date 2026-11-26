import { rolesForPath, type Role } from "@/lib/types";

export function homeForRole(role: Role | null | undefined): string {
  switch (role) {
    case "specialist":
      return "/hr/queue";
    case "operator":
      return "/operator";
    case "admin":
      return "/admin";
    case "student":
    case "employee":
      return "/home";
    default:
      return "/role";
  }
}

export function canAccessPath(
  pathname: string,
  activeRole: Role | null | undefined,
): boolean {
  const needed = rolesForPath(pathname);
  if (!needed) return true;
  return Boolean(activeRole && needed.includes(activeRole));
}
