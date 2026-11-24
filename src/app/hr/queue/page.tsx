"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader, StatCard, StatusBadge } from "@/components/ui";
import { hrQueue } from "@/lib/demo-data";

export default function HrQueuePage() {
  return (
    <AppShell area="HR">
      <PageHeader
        eyebrow="HR / H01"
        title="Рабочая очередь HR"
        description="Заявки в вашей области ответственности."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Новые" value="18" hint="За последние 7 дней" />
        <StatCard label="В работе" value="26" hint="Назначены вашей группе" />
        <StatCard label="Просрочено" value="3" hint="Требуют внимания" />
        <StatCard label="Медиана обработки" value="1,4 дня" hint="Демонстрационный расчёт" />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="aiu-input pl-10" placeholder="Поиск по номеру или имени" />
        </div>
        <select className="aiu-input sm:max-w-56" defaultValue="mine">
          <option value="mine">Мои и неназначенные</option>
          <option value="all">Все</option>
        </select>
        <Link href="/analytics" className="aiu-btn-secondary">
          Отчёт по очереди
        </Link>
      </div>

      <div className="mt-4">
        <DataTable
          columns={["Номер / услуга", "Заявитель", "Исполнитель", "Статус", "Срок"]}
          rows={hrQueue.map((item) => [
            <Link
              key={item.id}
              href={`/applications/${item.id === "HR-0041" ? "HR-0052" : item.id}`}
              className="font-medium text-brand hover:underline"
            >
              {item.id} · {item.service}
            </Link>,
            item.applicant,
            item.assignee,
            <StatusBadge
              key={`${item.id}-s`}
              status={item.due === "Вчера" ? "rejected" : item.status}
            />,
            item.due,
          ])}
        />
      </div>
    </AppShell>
  );
}
