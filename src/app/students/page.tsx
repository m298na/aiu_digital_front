"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  DataTable,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from "@/components/ui";
import { getStudents } from "@/lib/api/client";
import type { studentsStore } from "@/lib/data/store";

type Student = (typeof studentsStore)[number];

export default function StudentsPage() {
  const [items, setItems] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getStudents()
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
    <AppShell area="Студенты">
      <PageHeader
        eyebrow="Студенты / T01"
        title="Реестр студентов"
        description="Академический статус и свежесть данных."
      />
      {loading ? <LoadingBlock /> : null}
      {error ? <ErrorBlock message={error} /> : null}
      {!loading && !error ? (
        <DataTable
          columns={["Студент", "Программа", "Курс", "Статус", "Актуальность"]}
          rows={items.map((item) => [
            item.name,
            item.program,
            item.course,
            item.status,
            item.freshness,
          ])}
        />
      ) : null}
    </AppShell>
  );
}
