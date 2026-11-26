"use client";

import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import { DataTable, PageHeader } from "@/components/ui";

export default function AdminCalendarPage() {
  const { notify, Feedback } = useActionFeedback();

  return (
    <AppShell area="Администрирование">
      <Feedback />
      <PageHeader
        eyebrow="Администрирование / A07"
        title="Рабочий календарь и сроки"
        description="Правила календаря используются при расчёте SLA."
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="aiu-panel p-5">
          <p className="text-xs uppercase tracking-[0.08em] text-muted">Календарь</p>
          <p className="mt-2 font-display text-2xl text-ink">Университетский · 2027</p>
        </div>
        <div className="aiu-panel p-5">
          <p className="text-xs uppercase tracking-[0.08em] text-muted">Часовая зона</p>
          <p className="mt-2 font-display text-2xl text-ink">UTC+5</p>
        </div>
      </div>

      <DataTable
        columns={["Период / правило", "Тип", "Учитывается в SLA", "Основание"]}
        rows={[
          ["Понедельник — пятница", "Рабочие дни", "Да", "Утверждённый календарь"],
          ["Праздничные даты", "Нерабочие дни", "Нет", "Загружаемый список"],
          ["Уточнение по заявке", "Пауза", "По паспорту услуги", "Версия правила"],
        ]}
      />

      <button
        type="button"
        className="aiu-btn-primary mt-4"
        onClick={() => notify("Версия календаря сохранена.")}
      >
        Сохранить версию календаря
      </button>
    </AppShell>
  );
}
