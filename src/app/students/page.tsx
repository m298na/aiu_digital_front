"use client";

import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader } from "@/components/ui";
import { students } from "@/lib/demo-data";

export default function StudentsPage() {
  return (
    <AppShell area="Студенты">
      <PageHeader
        eyebrow="Студенты / T01"
        title="Реестр студентов"
        description="Программы, статусы и актуальность данных академической ИС."
        actions={
          <button type="button" className="aiu-btn-secondary">
            Задачи сверки
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="aiu-input pl-10"
            placeholder="ФИО, student ID или программа"
          />
        </div>
        <select className="aiu-input sm:max-w-56" defaultValue="all">
          <option value="all">Все высшие школы</option>
        </select>
      </div>

      <DataTable
        columns={["Студент", "Программа", "Курс", "Статус", "Актуальность"]}
        rows={students.map((item) => [
          item.name,
          item.program,
          item.course,
          item.status,
          item.freshness,
        ])}
      />
    </AppShell>
  );
}
