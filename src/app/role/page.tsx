"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowRight, Briefcase, GraduationCap, Headset, Shield, Building2 } from "lucide-react";
import { roleLabels, type Role } from "@/lib/demo-data";
import { useSession } from "@/lib/session";

const roles: {
  id: Role;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "student",
    title: roleLabels.student,
    description: "Учёба, услуги и общежитие",
    icon: GraduationCap,
  },
  {
    id: "employee",
    title: roleLabels.employee,
    description: "Кадровые услуги и документы",
    icon: Briefcase,
  },
  {
    id: "specialist",
    title: roleLabels.specialist,
    description: "Очереди и реестры подразделения",
    icon: Headset,
  },
  {
    id: "operator",
    title: roleLabels.operator,
    description: "Кампании, фонд мест и заселение",
    icon: Building2,
  },
  {
    id: "admin",
    title: roleLabels.admin,
    description: "Конфигурация, доступы и интеграции",
    icon: Shield,
  },
];

export default function RolePage() {
  const router = useRouter();
  const { ready, signedIn, setRole } = useSession();

  useEffect(() => {
    if (ready && !signedIn) router.replace("/");
  }, [ready, signedIn, router]);

  return (
    <div className="aiu-shell px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          AIU Digital University
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          В какой роли продолжить?
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
          У одного человека могут быть несколько назначений. Доступы зависят от
          роли. Переключение роли не даёт дополнительных прав на данные.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                type="button"
                className="aiu-panel group animate-rise p-5 text-left transition hover:-translate-y-0.5 hover:border-brand/30"
                style={{ animationDelay: `${index * 60}ms` }}
                onClick={() => {
                  setRole(role.id);
                  if (role.id === "specialist") router.push("/hr/queue");
                  else if (role.id === "operator") router.push("/operator");
                  else if (role.id === "admin") router.push("/admin");
                  else router.push("/home");
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl text-ink">
                  {role.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{role.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand">
                  Продолжить
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
