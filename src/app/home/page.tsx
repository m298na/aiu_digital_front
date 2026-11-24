"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader, StatCard, StatusBadge } from "@/components/ui";
import { applications, demoUser } from "@/lib/demo-data";
import { useSession } from "@/lib/session";

export default function HomePage() {
  const { role } = useSession();
  const isStudent = role === "student";

  return (
    <AppShell area="Общее">
      <PageHeader
        eyebrow={isStudent ? "Общее / D01" : "Общее / D02"}
        title={`Здравствуйте, ${demoUser.name.split(" ")[0]}`}
        description="Ваши услуги, заявки и важные события в одном месте."
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="aiu-panel animate-rise overflow-hidden bg-gradient-to-br from-brand to-brand-highlight p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            {isStudent ? "Кампания 2027/28" : "Кадровые услуги"}
          </p>
          <h2 className="mt-3 font-display text-3xl">
            Ваш следующий шаг — здесь
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/85">
            {isStudent
              ? "Подайте заявление на общежитие"
              : "Получите справку с места работы"}
          </p>
          <Link
            href={isStudent ? "/dormitory/campaign" : "/services/hr-01"}
            className="mt-6 inline-flex h-11 items-center rounded-xl bg-white px-5 text-sm font-medium text-brand"
          >
            Перейти к услуге →
          </Link>
        </div>

        <div className="aiu-panel animate-rise p-6" style={{ animationDelay: "80ms" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            Мой профиль
          </p>
          <h3 className="mt-3 font-display text-2xl text-ink">{demoUser.name}</h3>
          <p className="mt-2 text-sm text-muted">
            {isStudent
              ? `${demoUser.program} · ${demoUser.course}`
              : demoUser.department}
          </p>
          <Link
            href="/profile"
            className="mt-5 inline-flex text-sm font-medium text-brand hover:underline"
          >
            Открыть профиль
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Активные заявки" value="3" hint="1 требует вашего ответа" />
        <StatCard label="Готовые результаты" value="2" hint="Доступны для скачивания" />
        <StatCard label="Новые уведомления" value="4" hint="Обновлено сегодня" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Последние заявки</h2>
          <Link href="/applications" className="text-sm font-medium text-brand hover:underline">
            Все заявки
          </Link>
        </div>
        <DataTable
          columns={["Заявка", "Услуга", "Статус", "Обновлено"]}
          rows={applications.slice(0, 2).map((item) => [
            <Link
              key={item.id}
              href={`/applications/${item.id}`}
              className="font-medium text-brand hover:underline"
            >
              {item.id}
            </Link>,
            item.service,
            <StatusBadge key={`${item.id}-status`} status={item.status} />,
            item.updated,
          ])}
        />
      </div>
    </AppShell>
  );
}
