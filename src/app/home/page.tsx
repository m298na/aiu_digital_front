"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import {
  DataTable,
  ErrorBlock,
  LoadingBlock,
  PageHeader,
  StatCard,
  StatusBadge,
} from "@/components/ui";
import { getDashboard } from "@/lib/api/client";
import type { Application } from "@/lib/data/store";
import { useSession } from "@/lib/session";
import { isRole } from "@/lib/types";

function HomeContent() {
  const { role, roles, setRole, user } = useSession();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    active: number;
    needsResponse: number;
    done: number;
    unreadNotifications: number;
  } | null>(null);
  const [recent, setRecent] = useState<Application[]>([]);

  useEffect(() => {
    const requested = searchParams.get("role");
    if (requested && isRole(requested) && roles.includes(requested) && requested !== role) {
      void setRole(requested);
    }
  }, [searchParams, roles, role, setRole]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getDashboard()
      .then((data) => {
        if (cancelled) return;
        setStats(data.stats);
        setRecent(data.recent);
        setError(null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message || "Не удалось загрузить кабинет");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [role]);

  const isStudent = role === "student";
  const firstName = (user?.name ?? "Алия").split(" ")[0];

  return (
    <AppShell area="Общее">
      <PageHeader
        eyebrow={isStudent ? "Общее / D01" : "Общее / D02"}
        title={`Здравствуйте, ${firstName}`}
        description="Ваши услуги, заявки и важные события в одном месте."
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="aiu-panel animate-rise overflow-hidden bg-gradient-to-br from-brand to-brand-highlight p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            {isStudent ? "Кампания 2027/28" : "Кадровые услуги"}
          </p>
          <h2 className="mt-3 font-display text-3xl">Ваш следующий шаг — здесь</h2>
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
          <h3 className="mt-3 font-display text-2xl text-ink">
            {user?.name ?? "Пользователь"}
          </h3>
          <p className="mt-2 text-sm text-muted">{user?.email}</p>
          <Link
            href="/profile"
            className="mt-5 inline-flex text-sm font-medium text-brand hover:underline"
          >
            Открыть профиль
          </Link>
        </div>
      </div>

      {loading ? <div className="mt-4"><LoadingBlock /></div> : null}
      {error ? (
        <div className="mt-4">
          <ErrorBlock message={error} onRetry={() => window.location.reload()} />
        </div>
      ) : null}

      {stats ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Активные заявки"
            value={String(stats.active)}
            hint={
              stats.needsResponse
                ? `${stats.needsResponse} требуют вашего ответа`
                : "Нет ожидающих ответов"
            }
          />
          <StatCard
            label="Готовые результаты"
            value={String(stats.done)}
            hint="Доступны для скачивания"
          />
          <StatCard
            label="Новые уведомления"
            value={String(stats.unreadNotifications)}
            hint="Обновлено сегодня"
          />
        </div>
      ) : null}

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Последние заявки</h2>
          <Link href="/applications" className="text-sm font-medium text-brand hover:underline">
            Все заявки
          </Link>
        </div>
        <DataTable
          columns={["Заявка", "Услуга", "Статус", "Обновлено"]}
          rows={recent.map((item) => [
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

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-muted">Загружаем…</div>}>
      <HomeContent />
    </Suspense>
  );
}
