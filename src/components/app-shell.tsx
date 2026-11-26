"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  ClipboardList,
  GraduationCap,
  Home,
  LayoutGrid,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { DemoBanner } from "@/components/ui";
import { profileDefaults } from "@/lib/data/store";
import { useSession } from "@/lib/session";
import { roleLabels, type Role } from "@/lib/types";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
};

const navItems: NavItem[] = [
  { href: "/home", label: "Главная", icon: Home, roles: ["student", "employee"] },
  { href: "/services", label: "Услуги", icon: LayoutGrid, roles: ["student", "employee"] },
  {
    href: "/applications",
    label: "Мои заявки",
    icon: ClipboardList,
    roles: ["student", "employee"],
  },
  {
    href: "/dormitory",
    label: "Общежитие",
    icon: Building2,
    roles: ["student", "employee"],
  },
  {
    href: "/notifications",
    label: "Уведомления",
    icon: Bell,
    roles: ["student", "employee", "specialist", "operator", "admin"],
  },
  { href: "/hr/queue", label: "Рабочая очередь", icon: ClipboardList, roles: ["specialist"] },
  { href: "/hr/employees", label: "Сотрудники", icon: Users, roles: ["specialist"] },
  { href: "/operator", label: "Обзор", icon: Home, roles: ["operator"] },
  { href: "/operator/queue", label: "Очередь", icon: ClipboardList, roles: ["operator"] },
  { href: "/operator/rooms", label: "Фонд мест", icon: Building2, roles: ["operator"] },
  { href: "/operator/placements", label: "Размещения", icon: Users, roles: ["operator"] },
  {
    href: "/science",
    label: "Научный реестр",
    icon: BookOpen,
    roles: ["admin", "specialist"],
  },
  { href: "/students", label: "Студенты", icon: GraduationCap, roles: ["admin"] },
  {
    href: "/analytics",
    label: "Аналитика",
    icon: LayoutGrid,
    roles: ["admin", "operator", "specialist"],
  },
  { href: "/admin", label: "Администрирование", icon: Settings, roles: ["admin"] },
  {
    href: "/atlas",
    label: "Атлас экранов",
    icon: BookOpen,
    roles: ["student", "employee", "specialist", "operator", "admin"],
  },
];

export function AppShell({
  children,
  area = "Общее",
}: {
  children: React.ReactNode;
  area?: string;
}) {
  const { ready, signedIn, role, user, roles, signOut } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!signedIn) {
      router.replace("/");
      return;
    }
    if (!role) {
      router.replace("/role");
    }
  }, [ready, signedIn, role, router]);

  const items = useMemo(
    () => navItems.filter((item) => role && item.roles.includes(role)),
    [role],
  );

  if (!ready || !signedIn || !role) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted">
        Проверяем сессию…
      </div>
    );
  }

  const displayName = user?.name ?? profileDefaults.name;
  const subtitle =
    role === "student"
      ? `${profileDefaults.program} · ${profileDefaults.course}`
      : role === "employee"
        ? profileDefaults.department
        : roleLabels[role];

  return (
    <div className="aiu-shell">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-sidebar border-r border-line bg-white/95 p-5 backdrop-blur transition-transform lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-8 flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-2xl text-brand">AIU Digital</p>
              <p className="mt-1 text-xs text-muted">Astana International University</p>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-muted lg:hidden"
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    active ? "bg-brand text-white" : "text-ink hover:bg-canvas",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-card border border-line bg-canvas/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Нужна помощь?
            </p>
            <p className="mt-2 text-sm text-ink">Инструкции и поддержка</p>
            <Link
              href="/help"
              className="mt-3 inline-flex text-sm font-medium text-brand hover:underline"
              onClick={() => setOpen(false)}
            >
              Открыть справку →
            </Link>
          </div>
        </aside>

        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-ink/30 lg:hidden"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-line bg-white/85 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-line p-2 text-ink lg:hidden"
                  onClick={() => setOpen(true)}
                  aria-label="Открыть меню"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">
                    AIU / {area}
                  </p>
                  <p className="text-sm font-medium text-ink">
                    {roleLabels[role]} · {displayName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {roles.length > 1 ? (
                  <Link
                    href="/role"
                    className="aiu-btn-secondary hidden sm:inline-flex"
                  >
                    Сменить роль
                  </Link>
                ) : null}
                <button
                  type="button"
                  className="aiu-btn-secondary"
                  onClick={() => void signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <DemoBanner />
            <div className="mb-4 text-sm text-muted">{subtitle}</div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
