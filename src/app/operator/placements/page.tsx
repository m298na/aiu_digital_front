"use client";

import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader, StatusBadge } from "@/components/ui";
import { placements } from "@/lib/demo-data";

export default function PlacementsPage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / O08"
        title="Размещения и брони"
        description="Фактическое заселение и выезд фиксирует оператор."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["Все", "Ожидаемые заезды", "Брони истекают", "Проживают", "Архив"].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={index === 0 ? "aiu-btn-primary" : "aiu-btn-secondary"}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="aiu-input pl-10"
            placeholder="ID студента или номер комнаты"
          />
        </div>
        <select className="aiu-input sm:max-w-40" defaultValue="1">
          <option value="1">Корпус 1</option>
        </select>
      </div>

      <DataTable
        columns={["Студент", "Место", "Интервал", "Статус", "Действие"]}
        rows={placements.map((item) => [
          item.student,
          item.place,
          item.interval,
          <StatusBadge key={`${item.student}-s`} status={item.status} />,
          <button key={`${item.student}-a`} type="button" className="aiu-btn-secondary">
            {item.action}
          </button>,
        ])}
      />

      <p className="mt-4 text-sm text-muted">
        Просроченная бронь освобождается один раз. Дальнейшее действие по
        заявлению определяется правилами кампании.
      </p>
    </AppShell>
  );
}
