"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";
import { services } from "@/lib/demo-data";
import { useSession } from "@/lib/session";

export default function ServicesPage() {
  const { role } = useSession();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return services.filter((service) => {
      const matchesRole = role ? service.audience.includes(role) : true;
      const matchesQuery = `${service.title} ${service.description}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesRole && matchesQuery;
    });
  }, [query, role]);

  return (
    <AppShell area="Услуги">
      <PageHeader
        eyebrow="Услуги / C01"
        title="Каталог услуг"
        description="Выберите услугу. Доступные действия зависят от вашего профиля."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="aiu-input pl-10"
            placeholder="Поиск по названию услуги"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select className="aiu-input sm:max-w-56" defaultValue="all">
          <option value="all">Все подразделения</option>
          <option value="hr">HR</option>
          <option value="dor">Общежитие</option>
          <option value="it">IT</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="aiu-panel p-8 text-sm text-muted">
          По запросу ничего не найдено. Попробуйте другое название.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              className="aiu-panel animate-rise p-5 transition hover:-translate-y-0.5 hover:border-brand/30"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                {service.code}
              </span>
              <h2 className="mt-4 font-display text-2xl text-ink">
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
              <span className="mt-5 inline-flex text-sm font-medium text-brand">
                Подробнее →
              </span>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
