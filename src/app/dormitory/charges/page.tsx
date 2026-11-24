"use client";

import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader, StatCard } from "@/components/ui";

export default function ChargesPage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / S07"
        title="Начисления и оплата"
        description="Сведения подтверждает финансовая система."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Начислено" value="30 000 ₸" hint="Пример за июль" />
        <StatCard label="Подтверждено" value="30 000 ₸" hint="По данным финансовой ИС" />
        <StatCard label="Задолженность" value="0 ₸" hint="На дату обновления" />
      </div>

      <p className="mt-4 text-sm text-muted">
        Актуально на 10 июля, 11:00. Платформа показывает финансовые сведения.
        Приём платежей внутри портала не предусмотрен.
      </p>

      <div className="mt-6">
        <DataTable
          columns={["Период", "Документ", "Начислено", "Подтверждено", "Статус"]}
          rows={[
            [
              "Июль 2027",
              "FIN-DEMO-001",
              "30 000 ₸",
              "30 000 ₸",
              "Подтверждено",
            ],
          ]}
        />
      </div>

      <button type="button" className="aiu-btn-secondary mt-4">
        Сообщить о расхождении
      </button>
    </AppShell>
  );
}
