"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";
import { atlasScreens } from "@/lib/demo-data";
import { useSession } from "@/lib/session";

function AtlasGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {atlasScreens.map((screen, index) => (
        <Link
          key={screen.id}
          href={screen.href}
          className="aiu-panel animate-rise p-4 transition hover:-translate-y-0.5 hover:border-brand/30"
          style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            {screen.id}
          </span>
          <h2 className="mt-2 font-display text-xl text-ink">{screen.title}</h2>
          <p className="mt-2 text-xs text-muted">{screen.href}</p>
        </Link>
      ))}
    </div>
  );
}

export default function AtlasPage() {
  const { signedIn, role } = useSession();

  const header = (
    <PageHeader
      eyebrow="Screen Atlas"
      title="Каталог экранов AIU Digital"
      description="Интерактивный срез Screen Atlas: вход, роли, кабинет заявителя, HR, общежитие, оператор и администрирование. Все данные демонстрационные."
    />
  );

  if (!signedIn || !role) {
    return (
      <div className="aiu-shell mx-auto max-w-6xl px-4 py-10">
        {header}
        <div className="mb-5 rounded-card border border-line bg-white/80 p-4 text-sm text-muted">
          Для полного меню кабинета сначала{" "}
          <Link href="/" className="font-medium text-brand hover:underline">
            войдите
          </Link>{" "}
          и выберите роль. Прямые ссылки на экраны ниже уже работают.
        </div>
        <AtlasGrid />
      </div>
    );
  }

  return (
    <AppShell area="Атлас">
      {header}
      <AtlasGrid />
    </AppShell>
  );
}
