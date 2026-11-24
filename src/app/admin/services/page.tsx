"use client";

import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader } from "@/components/ui";

export default function AdminServicesPage() {
  return (
    <AppShell area="Администрирование">
      <PageHeader
        eyebrow="Администрирование / A04"
        title="Услуги и версии"
        description="Опубликованные паспорта и проекты новых версий."
        actions={
          <button type="button" className="aiu-btn-primary">
            Создать услугу
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="aiu-input pl-10" placeholder="Код или название услуги" />
        </div>
        <select className="aiu-input sm:max-w-56" defaultValue="all">
          <option value="all">Все подразделения</option>
        </select>
      </div>

      <DataTable
        columns={["Услуга", "Владелец", "Версия", "Состояние", "Изменено"]}
        rows={[
          ["HR-01 · Справка", "Кадровая служба", "1.0", "Опубликовано", "15 ноя"],
          ["HR-02 · Уточнение", "Кадровая служба", "1.1", "Черновик", "17 ноя"],
          ["IT-01 · Обращение", "Служба поддержки", "1.0", "Опубликовано", "10 ноя"],
        ]}
      />
    </AppShell>
  );
}
