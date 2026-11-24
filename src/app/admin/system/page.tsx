"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader, StatCard } from "@/components/ui";

export default function AdminSystemPage() {
  return (
    <AppShell area="Администрирование">
      <PageHeader
        eyebrow="Администрирование / A14"
        title="Состояние системы"
        description="Среда: staging · Все показатели приведены для примера"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="API p95 чтения" value="0,8 с" hint="Проектная цель ≤ 2 с" />
        <StatCard label="Ошибки 5xx" value="0,2%" hint="Проектная цель < 1%" />
        <StatCard label="Фоновые задания" value="12" hint="1 требует разбора" />
        <StatCard label="Резервная копия" value="09:00" hint="Восстановление: протокол" />
      </div>

      <div className="mt-4">
        <DataTable
          columns={["Сигнал", "Владелец", "Состояние", "Действие"]}
          rows={[
            ["Свежесть финансовых данных", "Интеграции", "Нужна проверка", "Открыть очередь"],
            ["Восстановление БД и файлов", "ДИТ", "Проверено на тесте", "Протокол испытания"],
            ["Карантин документов", "ИБ", "1 файл заблокирован", "Разобрать событие"],
          ]}
        />
      </div>

      <Link href="/atlas" className="aiu-btn-secondary mt-4 inline-flex">
        Открыть атлас экранов
      </Link>
    </AppShell>
  );
}
