"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Field, PageHeader } from "@/components/ui";
import { demoUser } from "@/lib/demo-data";

export default function Hr01ApplyPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  return (
    <AppShell area="Услуги">
      <PageHeader
        eyebrow="Услуги / C03"
        title="Заявка на справку"
        description="Заполните поля и проверьте сведения перед отправкой."
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          className="aiu-panel space-y-4 p-6"
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/applications/HR-0048");
          }}
        >
          <h2 className="font-display text-2xl text-ink">Данные заявки</h2>
          <Field label="Заявитель">
            <div className="aiu-readonly">{demoUser.name}</div>
          </Field>
          <Field label="Назначение">
            <select className="aiu-input" defaultValue="specialist">
              <option value="specialist">
                Специалист · Департамент цифровизации
              </option>
              <option value="teacher">Преподаватель · 0,25 ставки</option>
            </select>
          </Field>
          <Field label="Язык документа">
            <select className="aiu-input" defaultValue="ru">
              <option value="ru">Русский</option>
              <option value="kk">Қазақша</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="Адресат">
            <input className="aiu-input" defaultValue="По месту требования" />
          </Field>
          <div className="rounded-card border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            В справку войдут сведения по выбранному назначению.
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="submit" className="aiu-btn-primary">
              Отправить заявку
            </button>
            <button
              type="button"
              className="aiu-btn-secondary"
              onClick={() => setSaved(true)}
            >
              Сохранить черновик
            </button>
          </div>
          {saved ? (
            <p className="text-sm text-brand">Черновик сохранён в этом браузере.</p>
          ) : null}
        </form>

        <aside className="aiu-panel space-y-4 p-6">
          <h2 className="font-display text-2xl text-ink">Что произойдёт дальше</h2>
          {[
            ["Подача", "Номер и дата появятся в кабинете"],
            ["Проверка HR", "При необходимости запросят уточнение"],
            ["Данные в безопасности", "Документы доступны только уполномоченным"],
          ].map(([title, text]) => (
            <div key={title}>
              <p className="text-sm font-medium text-ink">{title}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          ))}
          <Link href="/services/hr-01" className="text-sm font-medium text-brand hover:underline">
            Вернуться к паспорту услуги
          </Link>
        </aside>
      </div>
    </AppShell>
  );
}
