"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import { DataTable, PageHeader } from "@/components/ui";

const services = [
  {
    title: "HR-01 · Справка",
    owner: "Кадровая служба",
    version: "1.0",
    state: "Опубликовано",
    updated: "15 ноя",
    unit: "hr",
  },
  {
    title: "HR-02 · Уточнение",
    owner: "Кадровая служба",
    version: "1.1",
    state: "Черновик",
    updated: "17 ноя",
    unit: "hr",
  },
  {
    title: "IT-01 · Обращение",
    owner: "Служба поддержки",
    version: "1.0",
    state: "Опубликовано",
    updated: "10 ноя",
    unit: "it",
  },
];

export default function AdminServicesPage() {
  const { notify, Feedback } = useActionFeedback();
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("all");

  const filtered = useMemo(() => {
    return services.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesUnit = unit === "all" || item.unit === unit;
      return matchesQuery && matchesUnit;
    });
  }, [query, unit]);

  return (
    <AppShell area="Администрирование">
      <Feedback />
      <PageHeader
        eyebrow="Администрирование / A04"
        title="Услуги и версии"
        description="Опубликованные паспорта и проекты новых версий."
        actions={
          <button
            type="button"
            className="aiu-btn-primary"
            onClick={() => notify("Мастер создания услуги откроется после подключения API каталога.")}
          >
            Создать услугу
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            className="aiu-input pl-10"
            name="q"
            placeholder="Код или название услуги"
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
          <option value="hr">HR</option>
          <option value="it">IT</option>
        </select>
      </div>

      <DataTable
        columns={["Услуга", "Владелец", "Версия", "Состояние", "Изменено"]}
        rows={filtered.map((item) => [
          item.title,
          item.owner,
          item.version,
          item.state,
          item.updated,
        ])}
      />
    </AppShell>
  );
}
