import type { Role } from "@/lib/types";

export type DemoProfileId =
  | "student"
  | "employee"
  | "specialist"
  | "operator"
  | "admin"
  | "multi";

export type DemoProfile = {
  id: DemoProfileId;
  label: string;
  description: string;
  name: string;
  email: string;
  roles: Role[];
};

/** Server-side allowlist only. Client cannot invent roles. */
export const DEMO_PROFILES: Record<DemoProfileId, DemoProfile> = {
  student: {
    id: "student",
    label: "Студент",
    description: "Кабинет заявителя · общежитие",
    name: "Алия Тестова",
    email: "demo.student@example.edu",
    roles: ["student"],
  },
  employee: {
    id: "employee",
    label: "Сотрудник",
    description: "Кадровые услуги и заявки",
    name: "Алия Тестова",
    email: "demo.employee@example.edu",
    roles: ["employee", "student"],
  },
  specialist: {
    id: "specialist",
    label: "Специалист HR",
    description: "Очередь и реестр сотрудников",
    name: "Специалист 01",
    email: "hr.specialist@example.edu",
    roles: ["specialist"],
  },
  operator: {
    id: "operator",
    label: "Оператор общежития",
    description: "Фонд мест и размещения",
    name: "Оператор 01",
    email: "dorm.operator@example.edu",
    roles: ["operator"],
  },
  admin: {
    id: "admin",
    label: "Администратор ДИТ",
    description: "Конфигурация и интеграции",
    name: "Администратор 01",
    email: "dit.admin@example.edu",
    roles: ["admin"],
  },
  multi: {
    id: "multi",
    label: "Несколько ролей",
    description: "Студент + сотрудник (как в атласе)",
    name: "Алия Тестова",
    email: "demo.multi@example.edu",
    roles: ["student", "employee"],
  },
};

export function getDemoProfile(id: string | undefined | null): DemoProfile | null {
  if (!id) return null;
  return DEMO_PROFILES[id as DemoProfileId] ?? null;
}
