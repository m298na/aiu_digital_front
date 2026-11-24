"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";
import { demoUser } from "@/lib/demo-data";
import { useSession } from "@/lib/session";

export default function ProfilePage() {
  const { role } = useSession();
  const isStudent = role === "student";

  return (
    <AppShell area="Общее">
      <PageHeader
        eyebrow="Общее / D03"
        title="Личный профиль"
        description="Подтверждённые данные поступают из университетских систем."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["Основные сведения", "Назначения", "История обновлений"].map(
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

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="aiu-panel p-6">
          <h2 className="font-display text-2xl text-ink">Личные данные</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["ФИО", demoUser.name],
              [
                "Университетская почта",
                isStudent ? demoUser.emailStudent : demoUser.emailEmployee,
              ],
              [
                isStudent ? "Программа" : "Подразделение",
                isStudent ? demoUser.program : demoUser.department,
              ],
              [
                isStudent ? "Курс и статус" : "Должность",
                isStudent ? `${demoUser.course} · Активный` : demoUser.position,
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
          <button type="button" className="aiu-btn-secondary mt-6">
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
                  {demoUser.program}
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
    </AppShell>
  );
}
