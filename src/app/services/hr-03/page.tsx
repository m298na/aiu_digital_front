"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Field, PageHeader } from "@/components/ui";
import { profileDefaults } from "@/lib/data/store";
import { useSession } from "@/lib/session";

export default function Hr03Page() {
  const router = useRouter();
  const { user } = useSession();

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
          const form = new FormData(event.currentTarget);
          if (!form.get("docType")) {
            event.currentTarget.reportValidity();
            return;
          }
          router.push("/applications");
        }}
      >
        <Field label="Заявитель">
          <div className="aiu-readonly">{user?.name ?? profileDefaults.name}</div>
        </Field>
        <Field label="Тип документа" htmlFor="docType">
          <select id="docType" name="docType" className="aiu-input" defaultValue="" required>
            <option value="" disabled>
              Разрешённый тип документа
            </option>
            <option value="contract">Трудовой договор</option>
            <option value="order">Приказ</option>
          </select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Период с" htmlFor="from">
            <input
              id="from"
              name="from"
              className="aiu-input"
              type="date"
              defaultValue="2026-09-01"
              required
            />
          </Field>
          <Field label="Период по" htmlFor="to">
            <input
              id="to"
              name="to"
              className="aiu-input"
              type="date"
              defaultValue="2026-11-17"
              required
            />
          </Field>
        </div>
        <div className="rounded-card border border-line bg-canvas/70 px-4 py-3 text-sm text-muted">
          HR проверит принадлежность документа и разместит копию.
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="aiu-btn-primary">
            Отправить заявку
          </button>
        </div>
      </form>
    </AppShell>
  );
}
