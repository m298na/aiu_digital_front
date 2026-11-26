"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import {
  DataTable,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
  StatusBadge,
} from "@/components/ui";
import { getPlacements } from "@/lib/api/client";
import type { placementsStore } from "@/lib/data/store";

type Placement = (typeof placementsStore)[number];

export default function PlacementsPage() {
  const [items, setItems] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify, Feedback } = useActionFeedback();

  useEffect(() => {
    let cancelled = false;
    getPlacements()
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
        eyebrow="Общежития / O08"
        title="Размещения"
        description="Текущие брони и заселения."
      />

      {loading ? <LoadingBlock /> : null}
      {error ? <ErrorBlock message={error} /> : null}
      {!loading && !error ? (
        <DataTable
          columns={["Студент", "Место", "Период", "Статус", "Действие"]}
          rows={items.map((item) => [
            item.student,
            item.place,
            item.interval,
            <StatusBadge key={`${item.student}-s`} status={item.status} />,
            <button
              key={`${item.student}-a`}
              type="button"
              className="text-sm font-medium text-brand hover:underline"
              onClick={() => notify(`Действие «${item.action}» поставлено в очередь.`)}
            >
              {item.action}
            </button>,
          ])}
        />
      ) : null}
    </AppShell>
  );
}
