"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  DataTable,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
  StatCard,
  StatusBadge,
} from "@/components/ui";
import { getHrQueue } from "@/lib/api/client";
import type { hrQueueStore } from "@/lib/data/store";

type QueueItem = (typeof hrQueueStore)[number];

export default function HrQueuePage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("mine");
  const [items, setItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getHrQueue()
      .then((data) => {
        if (!cancelled) {
          setItems(data.items);
          setError(null);
        }
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
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = `${item.id} ${item.applicant} ${item.service}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesScope =
        scope === "all" || item.assignee !== "Специалист 02";
      return matchesQuery && matchesScope;
    });
  }, [items, query, scope]);

  const inReview = items.filter((item) => item.status === "in_review").length;
  const submitted = items.filter((item) => item.status === "submitted").length;
  const overdue = items.filter((item) => item.due === "Вчера").length;

  return (
    <AppShell area="HR">
      <PageHeader
        eyebrow="HR / H01"
        title="Рабочая очередь HR"
        description="Заявки в вашей области ответственности."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Новые" value={String(submitted)} hint="Ожидают назначения" />
        <StatCard label="В работе" value={String(inReview)} hint="На проверке" />
        <StatCard label="Просрочено" value={String(overdue)} hint="Требуют внимания" />
        <StatCard
          label="Всего в срезе"
          value={String(items.length)}
          hint="Текущая выборка очереди"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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
          className="aiu-input sm:max-w-56"
          name="scope"
          value={scope}
          onChange={(event) => setScope(event.target.value)}
        >
          <option value="mine">Мои и неназначенные</option>
          <option value="all">Все</option>
        </select>
        <Link href="/analytics" className="aiu-btn-secondary">
          Отчёт по очереди
        </Link>
      </div>

      <div className="mt-4">
        {loading ? <LoadingBlock /> : null}
        {error ? <ErrorBlock message={error} /> : null}
        {!loading && !error ? (
          <DataTable
            columns={["Номер / услуга", "Заявитель", "Исполнитель", "Статус", "Срок"]}
            rows={filtered.map((item) => [
              <Link
                key={item.id}
                href={`/applications/${item.id}`}
                className="font-medium text-brand hover:underline"
              >
                {item.id} · {item.service}
              </Link>,
              item.applicant,
              item.assignee,
              <StatusBadge key={`${item.id}-s`} status={item.status} />,
              item.due,
            ])}
          />
        ) : null}
      </div>
    </AppShell>
  );
}
