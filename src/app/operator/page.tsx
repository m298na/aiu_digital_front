"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/ui";

export default function OperatorHomePage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / O01"
        title="Обзор общежитий"
        description="Кампания 2027/28 · Демонстрационные показатели на 10 июля"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Эксплуатационный фонд" value="800" hint="Без 40 мест на ремонте" />
        <StatCard label="Заселено" value="620" hint="77,5% фонда" />
        <StatCard label="Забронировано" value="100" hint="Ожидают заезда" />
        <StatCard label="Свободно" value="80" hint="Без броней и заселений" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="aiu-panel p-6">
          <h2 className="font-display text-2xl text-ink">Загрузка корпусов</h2>
          <div className="mt-5 space-y-4">
            {[
              ["Корпус 1", 328, 400],
              ["Корпус 2", 292, 400],
            ].map(([name, used, total]) => {
              const percent = Math.round((Number(used) / Number(total)) * 100);
              return (
                <div key={String(name)}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{name}</span>
                    <span className="text-muted">
                      {used} / {total}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-canvas">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="aiu-panel p-6">
          <h2 className="font-display text-2xl text-ink">Требуют внимания</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink">
            <li>8 броней истекают сегодня</li>
            <li>3 расхождения оплаты</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/operator/placements" className="aiu-btn-primary">
              Открыть размещения
            </Link>
            <Link href="/operator/queue" className="aiu-btn-secondary">
              Очередь и распределение
            </Link>
            <Link href="/operator/rooms" className="aiu-btn-secondary">
              Фонд комнат и мест
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
