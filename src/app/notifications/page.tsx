"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import { ErrorBlock, LoadingBlock, PageHeader } from "@/components/ui";
import { getNotifications } from "@/lib/api/client";
import type { NotificationItem } from "@/lib/data/store";

export default function NotificationsPage() {
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notify, Feedback } = useActionFeedback();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getNotifications(tab), getNotifications("unread")])
      .then(([current, unread]) => {
        if (cancelled) return;
        setItems(current.items);
        setUnreadCount(unread.items.length);
        setError(null);
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
  }, [tab]);

  return (
    <AppShell area="Уведомления">
      <Feedback />
      <PageHeader
        eyebrow="Уведомления / C09"
        title="Уведомления"
        description="Изменения по заявкам всех ваших назначений и важные события."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={tab === "all" ? "aiu-btn-primary" : "aiu-btn-secondary"}
          onClick={() => setTab("all")}
        >
          Все
        </button>
        <button
          type="button"
          className={tab === "unread" ? "aiu-btn-primary" : "aiu-btn-secondary"}
          onClick={() => setTab("unread")}
        >
          Непрочитанные · {unreadCount}
        </button>
        <button
          type="button"
          className="aiu-btn-secondary"
          onClick={() => notify("Настройки уведомлений откроются после подключения профиля.")}
        >
          Настройки
        </button>
      </div>

      {loading ? <LoadingBlock /> : null}
      {error ? <ErrorBlock message={error} /> : null}

      {!loading && !error ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="aiu-panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between animate-rise"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div>
                <div className="flex items-center gap-2">
                  {item.unread ? (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  ) : null}
                  <h2 className="font-medium text-ink">{item.title}</h2>
                </div>
                <p className="mt-1 text-sm text-muted">{item.body}</p>
              </div>
              <Link href={item.href} className="aiu-btn-secondary">
                Открыть
              </Link>
            </div>
          ))}
          {items.length === 0 ? (
            <div className="aiu-panel p-8 text-sm text-muted">
              Нет уведомлений в этой вкладке.
            </div>
          ) : null}
        </div>
      ) : null}
    </AppShell>
  );
}
