"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader, StatusBadge } from "@/components/ui";

export default function DormitoryPage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / S01"
        title="Моё общежитие"
        description="Заявление, размещение и финансовая информация."
      />

      <div className="aiu-panel mb-4 overflow-hidden bg-gradient-to-br from-brand to-brand-highlight p-6 text-white">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status="in_review" />
          <span className="text-sm text-white/80">Заявление DU-0021</span>
        </div>
        <h2 className="mt-4 font-display text-3xl">Заявление на проверке</h2>
        <p className="mt-2 max-w-xl text-sm text-white/85">
          Следите за уведомлениями. Если понадобятся исправления, мы сообщим.
        </p>
        <Link
          href="/applications/DU-0021"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-white px-5 text-sm font-medium text-brand"
        >
          Открыть заявление
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Условия кампании",
            text: "Правила, сроки и документы",
            href: "/dormitory/campaign",
          },
          {
            title: "Моё размещение",
            text: "Корпус, место и срок брони",
            href: "/dormitory/placement",
          },
          {
            title: "Начисления и оплата",
            text: "Подтверждённые сведения",
            href: "/dormitory/charges",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="aiu-panel p-5 transition hover:-translate-y-0.5 hover:border-brand/30"
          >
            <h3 className="font-display text-2xl text-ink">{card.title}</h3>
            <p className="mt-2 text-sm text-muted">{card.text}</p>
            <span className="mt-4 inline-flex text-sm font-medium text-brand">
              Подробнее →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted">
        Предпочтение корпуса не создаёт бронь. Место появится после проверки,
        включения в очередь и подтверждённого распределения.
      </p>
    </AppShell>
  );
}
