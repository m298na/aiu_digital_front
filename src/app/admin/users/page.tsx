"use client";

import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DataTable, PageHeader } from "@/components/ui";

export default function AdminUsersPage() {
  return (
    <AppShell area="Администрирование">
      <PageHeader
        eyebrow="Администрирование / A02"
        title="Пользователи и полномочия"
        description="Роль, область, отдельные поля и срок действия доступа."
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="aiu-input pl-10" placeholder="Имя или внутренний ID" />
        </div>
        <select className="aiu-input sm:max-w-48" defaultValue="all">
          <option value="all">Все роли</option>
        </select>
      </div>

      <DataTable
        columns={["Пользователь", "Роль", "Область", "Срок", "Статус"]}
        rows={[
          ["Демо-оператор 01", "Общежитие", "Корпус 1", "30.09.2027", "Активен"],
          ["Демо-специалист 02", "HR", "Подразделение 01", "31.12.2027", "Активен"],
          ["Демо-аудитор 03", "Аудитор", "Назначенная область", "30.11.2026", "Активен"],
        ]}
      />

      <p className="mt-4 text-sm text-muted">
        Администратор и аудитор разделены. Техническая роль не открывает
        автоматически кадровые, медицинские и иные закрытые документы.
      </p>
    </AppShell>
  );
}
