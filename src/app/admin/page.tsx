"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";

const cards = [
  {
    id: "01",
    title: "Пользователи и доступы",
    text: "Роли, области, срок полномочий",
    href: "/admin/users",
  },
  {
    id: "02",
    title: "Услуги и версии",
    text: "Формы, маршруты и публикация",
    href: "/admin/services",
  },
  {
    id: "03",
    title: "Рабочий календарь",
    text: "Сроки, праздники и паузы",
    href: "/admin/calendar",
  },
  {
    id: "04",
    title: "Интеграции",
    text: "Актуальность и ошибки обмена",
    href: "/admin/integrations",
  },
  {
    id: "05",
    title: "Импорт данных",
    text: "Проверка, сопоставление, отчёт",
    href: "/admin/import",
  },
  {
    id: "06",
    title: "Состояние системы",
    text: "Сигналы и резервные копии",
    href: "/admin/system",
  },
];

export default function AdminPage() {
  return (
    <AppShell area="Администрирование">
      <PageHeader
        eyebrow="Администрирование / A01"
        title="Администрирование"
        description="Управление конфигурацией, доступами и обменом данными."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="aiu-panel p-5 transition hover:-translate-y-0.5 hover:border-brand/30"
          >
            <span className="text-xs font-semibold text-muted">{card.id}</span>
            <h2 className="mt-3 font-display text-2xl text-ink">{card.title}</h2>
            <p className="mt-2 text-sm text-muted">{card.text}</p>
            <span className="mt-4 inline-flex text-sm font-medium text-brand">
              Открыть →
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
