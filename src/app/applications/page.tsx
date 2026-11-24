"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, EmptyState, PageHeader, StatusBadge } from "@/components/ui";
import { applications } from "@/lib/demo-data";

const tabs = [
  { id: "all", label: "Все заявки" },
  { id: "needs", label: "Требуют ответа · 1" },
  { id: "drafts", label: "Черновики · 2" },
  { id: "done", label: "Завершённые" },
] as const;

export default function ApplicationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return applications.filter((item) => {
      const matchesQuery = `${item.id} ${item.service}`
        .toLowerCase()
        .includes(query.toLowerCase());
      if (!matchesQuery) return false;
      if (tab === "needs") return item.status === "clarification";
      if (tab === "drafts") return item.status === "draft";
      if (tab === "done") return item.status === "done" || item.status === "approved";
      return true;
    });
  }, [query, tab]);

  return (
    <AppShell area="Заявки">
      <PageHeader
        eyebrow="Заявки / C06"
        title="Мои заявки"
        description="Следите за сроками, отвечайте на уточнения и получайте результаты."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={
              tab === item.id ? "aiu-btn-primary" : "aiu-btn-secondary"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="aiu-input pl-10"
            placeholder="Поиск по номеру или имени"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select className="aiu-input sm:max-w-48" defaultValue="all">
          <option value="all">Все статусы</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="Пока нет заявок"
          description="Начните с каталога услуг. После подачи здесь появятся номер, статус и история."
          actionLabel="Перейти в каталог"
          href="/services"
        />
      ) : (
        <DataTable
          columns={["Номер", "Услуга", "Статус", "Следующий шаг", "Срок"]}
          rows={rows.map((item) => [
            <Link
              key={item.id}
              href={`/applications/${item.id}`}
              className="font-medium text-brand hover:underline"
            >
              {item.id}
            </Link>,
            item.service,
            <StatusBadge key={`${item.id}-s`} status={item.status} />,
            item.nextStep,
            item.due,
          ])}
        />
      )}
    </AppShell>
  );
}
