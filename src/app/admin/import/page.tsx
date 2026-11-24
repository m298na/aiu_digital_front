"use client";

import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader, StatCard } from "@/components/ui";

export default function AdminImportPage() {
  return (
    <AppShell area="Администрирование">
      <PageHeader
        eyebrow="Администрирование / A09–A10"
        title="Импорт данных из файла"
        description="Сопоставление и проверка перед применением · Отчёт пакета IMP-DEMO-001"
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Принято" value="1 204" hint="Сохранено" />
        <StatCard label="Отклонено" value="2" hint="Нужна корректировка" />
        <StatCard label="Конфликты" value="1" hint="Передан на сверку" />
      </div>

      <DataTable
        columns={["Колонка файла", "Поле платформы", "Проверка", "Пример"]}
        rows={[
          ["external_id", "Внешний ключ", "Обязательно", "EMP-DEMO-001"],
          ["full_name", "ФИО", "Unicode", "Алия Тестова"],
          ["org_unit", "Подразделение", "Ссылка на справочник", "UNIT-DEMO-01"],
        ]}
      />

      <div className="mt-4">
        <DataTable
          columns={["Строка", "Ключ", "Код", "Пояснение"]}
          rows={[
            ["38", "EMP-DEMO-038", "UNKNOWN_ORG", "Подразделение отсутствует в справочнике"],
            ["89", "—", "MISSING_KEY", "Отсутствует внешний идентификатор"],
            [
              "102",
              "EMP-DEMO-102",
              "FIELD_CONFLICT",
              "Конфликт с подтверждённой ручной правкой",
            ],
          ]}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="aiu-btn-primary">
          Проверить и применить
        </button>
        <button type="button" className="aiu-btn-secondary">
          Скачать отчёт ошибок
        </button>
      </div>
    </AppShell>
  );
}
