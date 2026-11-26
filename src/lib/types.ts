export type Role =
  | "student"
  | "employee"
  | "specialist"
  | "operator"
  | "admin";

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "clarification"
  | "approved"
  | "done"
  | "rejected"
  | "reserved"
  | "settled";

export const ALL_ROLES: Role[] = [
  "student",
  "employee",
  "specialist",
  "operator",
  "admin",
];

export const roleLabels: Record<Role, string> = {
  student: "Студент",
  employee: "Сотрудник",
  specialist: "Специалист HR",
  operator: "Оператор общежития",
  admin: "Администратор ДИТ",
};

export const statusLabels: Record<ApplicationStatus, string> = {
  draft: "Черновик",
  submitted: "Подано",
  in_review: "На проверке",
  clarification: "На уточнении",
  approved: "Одобрено",
  done: "Исполнено",
  rejected: "Отказано",
  reserved: "Забронировано",
  settled: "Заселён",
};

export const statusStyles: Record<ApplicationStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  submitted: "bg-indigo-50 text-brand",
  in_review: "bg-amber-50 text-amber-800",
  clarification: "bg-orange-50 text-orange-800",
  approved: "bg-emerald-50 text-emerald-800",
  done: "bg-emerald-50 text-emerald-800",
  rejected: "bg-red-50 text-red-700",
  reserved: "bg-sky-50 text-sky-800",
  settled: "bg-teal-50 text-teal-800",
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ALL_ROLES as string[]).includes(value);
}

export function parseRoles(value: unknown): Role[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRole);
}

/** Route prefixes → allowed active roles */
export const ROUTE_ACCESS: { prefix: string; roles: Role[] }[] = [
  { prefix: "/admin", roles: ["admin"] },
  { prefix: "/hr", roles: ["specialist"] },
  { prefix: "/operator", roles: ["operator"] },
  { prefix: "/science", roles: ["admin", "specialist"] },
  { prefix: "/students", roles: ["admin"] },
  { prefix: "/analytics", roles: ["admin", "operator", "specialist"] },
  { prefix: "/home", roles: ["student", "employee"] },
  { prefix: "/services", roles: ["student", "employee"] },
  { prefix: "/applications", roles: ["student", "employee", "specialist"] },
  { prefix: "/dormitory", roles: ["student", "employee"] },
  { prefix: "/profile", roles: ["student", "employee", "specialist", "operator", "admin"] },
  { prefix: "/notifications", roles: ["student", "employee", "specialist", "operator", "admin"] },
  { prefix: "/help", roles: ["student", "employee", "specialist", "operator", "admin"] },
  { prefix: "/atlas", roles: ["student", "employee", "specialist", "operator", "admin"] },
  { prefix: "/role", roles: ["student", "employee", "specialist", "operator", "admin"] },
];

export function rolesForPath(pathname: string): Role[] | null {
  const match = ROUTE_ACCESS.find(
    (rule) =>
      pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`),
  );
  return match ? match.roles : null;
}

export function pluralizeRecords(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "запись";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "записи";
  return "записей";
}
