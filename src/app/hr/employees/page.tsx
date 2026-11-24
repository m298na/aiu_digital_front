"use client";

import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader } from "@/components/ui";
import { employees } from "@/lib/demo-data";

export default function EmployeesPage() {
  return (
    <AppShell area="Сотрудники">
      <PageHeader
        eyebrow="Сотрудники / H06"
        title="Сотрудники"
        description="Реестр назначений и кадровой истории."
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="aiu-input pl-10" placeholder="ФИО или ID сотрудника" />
        </div>
        <select className="aiu-input sm:max-w-56" defaultValue="all">
          <option value="all">Все подразделения</option>
        </select>
      </div>

      <DataTable
        columns={["Сотрудник", "Подразделение", "Должность", "Договор", "Актуальность"]}
        rows={employees.map((item) => [
          item.name,
          item.unit,
          item.position,
          item.contract,
          item.freshness,
        ])}
      />
    </AppShell>
  );
}
