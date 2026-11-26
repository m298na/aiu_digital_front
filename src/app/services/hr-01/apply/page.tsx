"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import { Field, PageHeader } from "@/components/ui";
import { profileDefaults } from "@/lib/data/store";
import {
  hrCertificateSchema,
  type HrCertificateValues,
} from "@/lib/schemas/hr-certificate";
import { useSession } from "@/lib/session";

export default function Hr01ApplyPage() {
  const router = useRouter();
  const { user } = useSession();
  const { notify, Feedback } = useActionFeedback();
  const form = useForm<HrCertificateValues>({
    resolver: zodResolver(hrCertificateSchema),
    defaultValues: {
      purpose: "specialist",
      language: "ru",
      recipient: "По месту требования",
    },
  });

  return (
    <AppShell area="Услуги">
      <Feedback />
      <PageHeader
        eyebrow="Услуги / C03"
        title="Заявка на справку"
        description="Заполните поля и проверьте сведения перед отправкой."
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          className="aiu-panel space-y-4 p-6"
          onSubmit={form.handleSubmit(() => {
            router.push("/applications/HR-0048");
          })}
        >
          <h2 className="font-display text-2xl text-ink">Данные заявки</h2>
          <Field label="Заявитель">
            <div className="aiu-readonly">
              {user?.name ?? profileDefaults.name}
            </div>
          </Field>
          <Field label="Назначение" htmlFor="purpose">
            <select
              id="purpose"
              className="aiu-input"
              {...form.register("purpose")}
            >
              <option value="specialist">
                Специалист · Департамент цифровизации
              </option>
              <option value="teacher">Преподаватель · 0,25 ставки</option>
            </select>
            {form.formState.errors.purpose ? (
              <span className="mt-1.5 block text-xs text-red-700">
                {form.formState.errors.purpose.message}
              </span>
            ) : null}
          </Field>
          <Field label="Язык документа" htmlFor="language">
            <select
              id="language"
              className="aiu-input"
              {...form.register("language")}
            >
              <option value="ru">Русский</option>
              <option value="kk">Қазақша</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="Адресат" htmlFor="recipient">
            <input
              id="recipient"
              className="aiu-input"
              {...form.register("recipient")}
            />
            {form.formState.errors.recipient ? (
              <span className="mt-1.5 block text-xs text-red-700">
                {form.formState.errors.recipient.message}
              </span>
            ) : null}
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
              onClick={() => notify("Черновик справки сохранён.")}
            >
              Сохранить черновик
            </button>
          </div>
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
          <Link
            href="/services/hr-01"
            className="text-sm font-medium text-brand hover:underline"
          >
            Вернуться к паспорту услуги
          </Link>
        </aside>
      </div>
    </AppShell>
  );
}
