"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Field, PageHeader } from "@/components/ui";

export default function It01Page() {
  const router = useRouter();

  return (
    <AppShell area="Услуги">
      <PageHeader
        eyebrow="Услуги / E05"
        title="Обращение в подразделение"
        description="Общая форма электронного обращения."
      />
      <form
        className="aiu-panel mx-auto max-w-2xl space-y-4 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/applications");
        }}
      >
        <Field label="Подразделение">
          <select className="aiu-input" defaultValue="support">
            <option value="support">Служба поддержки</option>
            <option value="hr">Кадровая служба</option>
            <option value="dorm">Служба общежитий</option>
          </select>
        </Field>
        <Field label="Тема">
          <input
            className="aiu-input"
            defaultValue="Уточнение по университетской услуге"
          />
        </Field>
        <Field label="Описание">
          <textarea
            className="aiu-input min-h-32"
            placeholder="Опишите вопрос и ожидаемый результат"
          />
        </Field>
        <Field label="Вложения" hint="Необязательно">
          <input className="aiu-input" type="file" />
        </Field>
        <button type="submit" className="aiu-btn-primary">
          Отправить обращение
        </button>
      </form>
    </AppShell>
  );
}
