"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";
import { notifications } from "@/lib/demo-data";

export default function NotificationsPage() {
  const [tab, setTab] = useState<"all" | "unread">("all");
  const items =
    tab === "unread" ? notifications.filter((item) => item.unread) : notifications;

  return (
    <AppShell area="Уведомления">
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
          Непрочитанные · 4
        </button>
        <button type="button" className="aiu-btn-secondary">
          Настройки
        </button>
      </div>

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
      </div>
    </AppShell>
  );
}
