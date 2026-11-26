"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  DataTable,
  EmptyState,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
  StatusBadge,
} from "@/components/ui";
import { getApplications } from "@/lib/api/client";
import type { Application } from "@/lib/data/store";
import type { ApplicationStatus } from "@/lib/types";

export default function ApplicationsPage() {
  const [tab, setTab] = useState<"all" | "needs" | "drafts" | "done">("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [items, setItems] = useState<Application[]>([]);
  const [counts, setCounts] = useState({ all: 0, needs: 0, drafts: 0, done: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getApplications({ tab, q: query, status })
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setCounts(data.counts);
        setError(null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, query, status]);

  const tabs = useMemo(
    () => [
      { id: "all" as const, label: `Все заявки · ${counts.all}` },
      { id: "needs" as const, label: `Требуют ответа · ${counts.needs}` },
      { id: "drafts" as const, label: `Черновики · ${counts.drafts}` },
      { id: "done" as const, label: `Завершённые · ${counts.done}` },
    ],
    [counts],
  );

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
            className={tab === item.id ? "aiu-btn-primary" : "aiu-btn-secondary"}
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
            name="q"
            placeholder="Поиск по номеру или имени"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select
          className="aiu-input sm:max-w-48"
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="all">Все статусы</option>
          <option value="draft">Черновик</option>
          <option value="submitted">Подано</option>
          <option value="in_review">На проверке</option>
          <option value="clarification">На уточнении</option>
          <option value="approved">Одобрено</option>
          <option value="done">Исполнено</option>
        </select>
      </div>

      {loading ? <LoadingBlock /> : null}
      {error ? <ErrorBlock message={error} /> : null}

      {!loading && !error && items.length === 0 ? (
        <EmptyState
          title="Пока нет заявок"
          description="Начните с каталога услуг. После подачи здесь появятся номер, статус и история."
          actionLabel="Перейти в каталог"
          href="/services"
        />
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <DataTable
          columns={["Номер", "Услуга", "Статус", "Следующий шаг", "Срок"]}
          rows={items.map((item) => [
            <Link
              key={item.id}
              href={`/applications/${item.id}`}
              className="font-medium text-brand hover:underline"
            >
              {item.id}
            </Link>,
            item.service,
            <StatusBadge
              key={`${item.id}-s`}
              status={item.status as ApplicationStatus}
            />,
            item.nextStep,
            item.due,
          ])}
        />
      ) : null}
    </AppShell>
  );
}
