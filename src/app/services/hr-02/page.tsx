"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Field, PageHeader } from "@/components/ui";
import { demoUser } from "@/lib/demo-data";

export default function Hr02Page() {
  const router = useRouter();

  return (
    <AppShell area="Услуги">
      <PageHeader
        eyebrow="Услуги / C04"
        title="Уточнение кадровых данных"
        description="Заполните поля и проверьте сведения перед отправкой."
      />
      <form
        className="aiu-panel mx-auto max-w-2xl space-y-4 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/applications/HR-0052");
        }}
      >
        <Field label="Заявитель">
          <div className="aiu-readonly">{demoUser.name}</div>
        </Field>
        <Field label="Поле для исправления">
          <select className="aiu-input" defaultValue="phone">
            <option value="phone">Контактный телефон</option>
            <option value="email">Личная почта</option>
          </select>
        </Field>
        <Field label="Текущее значение">
          <div className="aiu-readonly">Не указан</div>
        </Field>
        <Field label="Новое значение">
          <input className="aiu-input" defaultValue="+7 (000) 000-00-00" />
        </Field>
        <Field label="Основание">
          <textarea
            className="aiu-input min-h-24"
            defaultValue="Актуализация контактных сведений"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="aiu-btn-primary">
            Отправить заявку
          </button>
          <button type="button" className="aiu-btn-secondary">
            Сохранить черновик
          </button>
        </div>
      </form>
    </AppShell>
  );
}
