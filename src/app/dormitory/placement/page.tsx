"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader, StatusBadge } from "@/components/ui";

export default function PlacementPage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / S06"
        title="Вам назначено место"
        description="DU-0021 · Проверьте срок брони и условия заселения"
        actions={<StatusBadge status="reserved" />}
      />

      <div className="aiu-panel mb-4 border-accent/50 bg-accent-soft p-5">
        <p className="font-medium text-ink">Бронь действует до 12 июля, 18:00</p>
        <p className="mt-1 text-sm text-muted">
          Демонстрационный срок. Если не успеваете заселиться, свяжитесь с
          оператором.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="aiu-panel p-6">
          <h2 className="font-display text-2xl text-ink">Ваше размещение</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Корпус", "Корпус 1"],
              ["Комната / место", "204 · Место 2"],
              ["Плановая дата заселения", "10.07.2027"],
              ["Статус", "Забронировано"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.08em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="aiu-panel space-y-4 p-6">
          <h2 className="font-display text-2xl text-ink">Перед заселением</h2>
          {[
            ["Проверьте начисления", "Статус подтверждает финансовая ИС"],
            ["Подготовьте документы", "Состав указан в правилах кампании"],
            ["Обратитесь к оператору", "Фактическое заселение подтвердит сотрудник"],
          ].map(([title, text]) => (
            <div key={title}>
              <p className="text-sm font-medium text-ink">{title}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          ))}
          <Link href="/dormitory/charges" className="aiu-btn-primary">
            Начисления и оплата
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
