"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader } from "@/components/ui";
import { scienceResults } from "@/lib/demo-data";

export default function SciencePage() {
  return (
    <AppShell area="Наука">
      <PageHeader
        eyebrow="Наука / N01"
        title="Научный реестр"
        description="Уникальные результаты и участие авторов учитываются отдельно."
        actions={
          <button type="button" className="aiu-btn-primary">
            Добавить результат
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["Публикации", "Гранты", "Патенты", "Авторы и ORCID"].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={index === 0 ? "aiu-btn-primary" : "aiu-btn-secondary"}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="aiu-input pl-10" placeholder="Название, DOI или автор" />
        </div>
        <select className="aiu-input sm:max-w-48" defaultValue="all">
          <option value="all">Все состояния</option>
        </select>
      </div>

      <DataTable
        columns={["Научный результат", "Год", "Авторы", "DOI / номер", "Проверка"]}
        rows={scienceResults.map((item) => [
          item.title,
          String(item.year),
          item.authors,
          item.doi,
          item.status,
        ])}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/analytics" className="aiu-btn-secondary">
          Открыть гранты
        </Link>
        <button type="button" className="aiu-btn-secondary">
          Открыть патенты
        </button>
        <button type="button" className="aiu-btn-secondary">
          Связи ORCID
        </button>
      </div>
    </AppShell>
  );
}
