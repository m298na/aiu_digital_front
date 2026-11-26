"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  DataTable,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from "@/components/ui";
import { getScience } from "@/lib/api/client";
import type { scienceStore } from "@/lib/data/store";

type ScienceItem = (typeof scienceStore)[number];

export default function SciencePage() {
  const [items, setItems] = useState<ScienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getScience()
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
    <AppShell area="Наука">
      <PageHeader
        eyebrow="Наука / N01"
        title="Научный реестр"
        description="Публикации и результаты с проверкой DOI."
      />
      {loading ? <LoadingBlock /> : null}
      {error ? <ErrorBlock message={error} /> : null}
      {!loading && !error ? (
        <DataTable
          columns={["Публикация", "Год", "Участия", "DOI", "Статус"]}
          rows={items.map((item) => [
            item.title,
            String(item.year),
            item.authors,
            item.doi,
            item.status,
          ])}
        />
      ) : null}
    </AppShell>
  );
}
