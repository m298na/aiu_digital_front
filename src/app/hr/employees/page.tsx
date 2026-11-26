"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  DataTable,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
} from "@/components/ui";
import { getEmployees } from "@/lib/api/client";
import type { employeesStore } from "@/lib/data/store";

type Employee = (typeof employeesStore)[number];

export default function EmployeesPage() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("all");
  const [items, setItems] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getEmployees({ q: query, unit })
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
  }, [query, unit]);

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
          <input
            className="aiu-input pl-10"
            name="q"
            placeholder="ФИО или ID сотрудника"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select
          className="aiu-input sm:max-w-56"
          name="unit"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
        >
          <option value="all">Все подразделения</option>
          <option value="Цифровизация">Цифровизация</option>
          <option value="Высшая школа 01">Высшая школа 01</option>
          <option value="Высшая школа 02">Высшая школа 02</option>
        </select>
      </div>

      {loading ? <LoadingBlock /> : null}
      {error ? <ErrorBlock message={error} /> : null}
      {!loading && !error ? (
        <DataTable
          columns={["Сотрудник", "Подразделение", "Должность", "Договор", "Актуальность"]}
          rows={items.map((item) => [
            item.name,
            item.unit,
            item.position,
            item.contract,
            item.freshness,
          ])}
        />
      ) : null}
    </AppShell>
  );
}
