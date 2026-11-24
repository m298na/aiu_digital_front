"use client";

import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader } from "@/components/ui";
import { dormQueue } from "@/lib/demo-data";

export default function OperatorQueuePage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / O05"
        title="Очередь на размещение"
        description="Только одобренные заявления · Версия очереди 12"
      />

      <div className="aiu-panel mb-4 border-brand/20 bg-brand/5 p-4 text-sm text-ink">
        Порядок определяет версия правил 1.0. При равенстве: время первичной
        подачи, затем ID.
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="aiu-input pl-10" placeholder="ID заявления или студента" />
        </div>
        <select className="aiu-input sm:max-w-40" defaultValue="1">
          <option value="1">Корпус 1</option>
          <option value="2">Корпус 2</option>
        </select>
        <button type="button" className="aiu-btn-primary">
          Предпросмотр назначения
        </button>
      </div>

      <DataTable
        columns={["Место", "Заявление", "Основание ранга", "Подача", "Подбор"]}
        rows={dormQueue.map((item) => [
          String(item.place),
          item.id,
          item.rank,
          item.submitted,
          item.fit,
        ])}
      />

      <button type="button" className="aiu-btn-secondary mt-4">
        Ручное отклонение от очереди
      </button>
    </AppShell>
  );
}
