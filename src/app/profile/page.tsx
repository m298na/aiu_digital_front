"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import { PageHeader } from "@/components/ui";
import { profileDefaults } from "@/lib/data/store";
import { useSession } from "@/lib/session";

export default function ProfilePage() {
  const { role, user } = useSession();
  const isStudent = role === "student";
  const [tab, setTab] = useState(0);
  const { notify, Feedback } = useActionFeedback();
  const tabs = ["Основные сведения", "Назначения", "История обновлений"];

  return (
    <AppShell area="Общее">
      <Feedback />
      <PageHeader
        eyebrow="Общее / D03"
        title="Личный профиль"
        description="Подтверждённые данные поступают из университетских систем."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((label, index) => (
          <button
            key={label}
            type="button"
            className={index === tab ? "aiu-btn-primary" : "aiu-btn-secondary"}
            onClick={() => setTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 0 ? (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="aiu-panel p-6">
            <h2 className="font-display text-2xl text-ink">Личные данные</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["ФИО", user?.name ?? profileDefaults.name],
                [
                  "Университетская почта",
                  user?.email ??
                    (isStudent
                      ? profileDefaults.emailStudent
                      : profileDefaults.emailEmployee),
                ],
                [
                  isStudent ? "Программа" : "Подразделение",
                  isStudent ? profileDefaults.program : profileDefaults.department,
                ],
                [
                  isStudent ? "Курс и статус" : "Должность",
                  isStudent
                    ? `${profileDefaults.course} · Активный`
                    : profileDefaults.position,
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-[0.08em] text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 rounded-xl border border-dashed border-line bg-canvas/70 px-3 py-2 text-sm">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              className="aiu-btn-secondary mt-6"
              onClick={() =>
                notify("Заявка на исправление профиля будет доступна через HR-02.")
              }
            >
              Предложить исправление
            </button>
          </div>

          <div className="aiu-panel space-y-4 p-6">
            <h2 className="font-display text-2xl text-ink">Мои назначения</h2>
            {isStudent ? (
              <>
                <div className="rounded-card border border-line bg-canvas/60 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted">
                    Основное
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">
                    {profileDefaults.program}
                  </p>
                  <p className="mt-1 text-xs text-muted">2025 – 2029 · Активный</p>
                </div>
                <p className="text-xs text-muted">
                  Источник: академическая ИС · Обновлено 17.11.2026, 08:50.
                </p>
              </>
            ) : (
              <>
                <div className="rounded-card border border-line bg-canvas/60 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted">
                    Основное
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">
                    Специалист · 1,0 ставки
                  </p>
                  <p className="mt-1 text-xs text-muted">Действует с 01.09.2026</p>
                </div>
                <div className="rounded-card border border-line bg-canvas/60 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted">
                    Дополнительное
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">
                    Преподаватель · 0,25 ставки
                  </p>
                  <p className="mt-1 text-xs text-muted">Источник: кадровая ИС</p>
                </div>
                <p className="text-xs text-muted">
                  Обновлено 17.11.2026, 09:15. Поля источника доступны только для
                  чтения.
                </p>
              </>
            )}
          </div>
        </div>
      ) : null}

      {tab === 1 ? (
        <div className="aiu-panel p-6 text-sm text-muted">
          Назначения синхронизируются из кадровой и академической ИС. Изменения
          вручную недоступны.
        </div>
      ) : null}

      {tab === 2 ? (
        <div className="aiu-panel space-y-3 p-6 text-sm">
          <p className="text-ink">17.11.2026, 09:15 — обновление кадровых данных</p>
          <p className="text-ink">17.11.2026, 08:50 — сверка академического статуса</p>
          <p className="text-muted">История хранится на стороне источника данных.</p>
        </div>
      ) : null}
    </AppShell>
  );
}
