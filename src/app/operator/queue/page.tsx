"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import {
  DataTable,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from "@/components/ui";
import { getDormQueue } from "@/lib/api/client";
import type { dormQueueStore } from "@/lib/data/store";

type QueueItem = (typeof dormQueueStore)[number];

export default function OperatorQueuePage() {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify, Feedback } = useActionFeedback();

  useEffect(() => {
    let cancelled = false;
    getDormQueue()
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

  return (
    <AppShell area="Общежития">
      <Feedback />
      <PageHeader
        eyebrow="Общежития / O05"
        title="Очередь размещения"
        description="Ранжированный список заявлений кампании."
        actions={
          <button
            type="button"
            className="aiu-btn-primary"
            onClick={() => notify("Предпросмотр назначения сформирован для текущего среза.")}
          >
            Предпросмотр назначения
          </button>
        }
      />

      {loading ? <LoadingBlock /> : null}
      {error ? <ErrorBlock message={error} /> : null}
      {!loading && !error ? (
        <DataTable
          columns={["Место", "Заявление", "Категория", "Подано", "Совместимость"]}
          rows={items.map((item) => [
            String(item.place),
            <Link
              key={item.id}
              href={`/applications/${item.id}`}
              className="font-medium text-brand hover:underline"
            >
              {item.id}
            </Link>,
            item.rank,
            item.submitted,
            item.fit,
          ])}
        />
      ) : null}
    </AppShell>
  );
}
