"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Field, PageHeader } from "@/components/ui";
import { demoUser } from "@/lib/demo-data";

export default function Hr03Page() {
  const router = useRouter();

  return (
    <AppShell area="Услуги">
      <PageHeader
        eyebrow="Услуги / C05"
        title="Копия кадрового документа"
        description="Заполните поля и проверьте сведения перед отправкой."
      />
      <form
        className="aiu-panel mx-auto max-w-2xl space-y-4 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/applications");
        }}
      >
        <Field label="Заявитель">
          <div className="aiu-readonly">{demoUser.name}</div>
        </Field>
        <Field label="Тип документа">
          <select className="aiu-input" defaultValue="">
            <option value="" disabled>
              Разрешённый тип документа
            </option>
            <option value="contract">Трудовой договор</option>
            <option value="order">Приказ</option>
          </select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Период с">
            <input className="aiu-input" type="date" defaultValue="2026-09-01" />
          </Field>
          <Field label="Период по">
            <input className="aiu-input" type="date" defaultValue="2026-11-17" />
          </Field>
        </div>
        <div className="rounded-card border border-line bg-canvas/70 px-4 py-3 text-sm text-muted">
          HR проверит принадлежность документа и разместит копию.
        </div>
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
