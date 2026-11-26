"use client";

import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import { DataTable, PageHeader } from "@/components/ui";

export default function AdminIntegrationsPage() {
  const { notify, Feedback } = useActionFeedback();

  return (
    <AppShell area="Администрирование">
      <Feedback />
      <PageHeader
        eyebrow="Администрирование / A08"
        title="Интеграции и свежесть данных"
        description="Источник каждого поля определяется паспортом обмена."
      />

      <DataTable
        columns={["Источник", "Последний обмен", "Принято / ошибки", "Состояние", "Действие"]}
        rows={[
          ["Кадровая ИС", "17.11, 09:15", "1 204 / 2", "Есть ошибки", "Открыть отчёт"],
          ["Академическая ИС", "17.11, 08:50", "8 420 / 0", "Актуально", "Открыть отчёт"],
          [
            "Финансовая ИС",
            "16.11, 16:00",
            "800 / 3",
            "Источник недоступен",
            "Разобрать очередь",
          ],
        ]}
      />

      <div className="mt-4 aiu-panel border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        Ограниченный режим: просмотр сохранён. Критичные действия блокируются по
        утверждённым порогам свежести.
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="aiu-btn-secondary"
          onClick={() => notify("Загрузка файла откроет мастер импорта.")}
        >
          Загрузить файл вручную
        </button>
        <button
          type="button"
          className="aiu-btn-primary"
          onClick={() => notify("Паспорт обмена открыт в режиме просмотра.")}
        >
          Паспорт обмена
        </button>
      </div>
    </AppShell>
  );
}
