"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  Headset,
  Shield,
} from "lucide-react";
import { homeForRole } from "@/lib/routing";
import { useSession } from "@/lib/session";
import { roleLabels, type Role } from "@/lib/types";

const icons: Record<
  Role,
  React.ComponentType<{ className?: string }>
> = {
  student: GraduationCap,
  employee: Briefcase,
  specialist: Headset,
  operator: Building2,
  admin: Shield,
};

const descriptions: Record<Role, string> = {
  student: "Учёба, услуги и общежитие",
  employee: "Кадровые услуги и документы",
  specialist: "Очереди и реестры подразделения",
  operator: "Кампании, фонд мест и заселение",
  admin: "Конфигурация, доступы и интеграции",
};

export default function RolePage() {
  const router = useRouter();
  const { ready, signedIn, roles, role, setRole } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (ready && !signedIn) router.replace("/");
  }, [ready, signedIn, router]);

  useEffect(() => {
    if (ready && signedIn && roles.length === 1 && !role) {
      void (async () => {
        await setRole(roles[0]);
        router.replace(homeForRole(roles[0]));
      })();
    }
  }, [ready, signedIn, roles, role, setRole, router]);

  if (!ready || !signedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted">
        Проверяем сессию…
      </div>
    );
  }

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
          Показаны только роли, выданные вашей учётной записи. Переключение не
          расширяет права на данные.
        </p>

        {roles.length === 0 ? (
          <div className="aiu-panel mt-8 p-6 text-sm text-muted">
            У учётной записи нет назначенных ролей. Обратитесь к администратору
            ДИТ или оператору сверки.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {roles.map((item, index) => {
              const Icon = icons[item];
              return (
                <button
                  key={item}
                  type="button"
                  disabled={pending}
                  className="aiu-panel group animate-rise p-5 text-left transition hover:-translate-y-0.5 hover:border-brand/30"
                  style={{ animationDelay: `${index * 60}ms` }}
                  onClick={() => {
                    void (async () => {
                      setPending(true);
                      setError(null);
                      try {
                        await setRole(item);
                        router.push(homeForRole(item));
                      } catch {
                        setError("Не удалось активировать роль.");
                        setPending(false);
                      }
                    })();
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
                    {roleLabels[item]}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{descriptions[item]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand">
                    Продолжить
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      </div>
    </div>
  );
}
