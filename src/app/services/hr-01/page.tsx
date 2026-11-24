"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";

export default function Hr01ServicePage() {
  return (
    <AppShell area="Услуги">
      <PageHeader
        eyebrow="Услуги / C02"
        title="Справка с места работы"
        description="Кадровая служба · Услуга HR-01"
      />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="aiu-panel space-y-5 p-6">
          <section>
            <h2 className="font-display text-2xl text-ink">Об услуге</h2>
            <p className="mt-2 text-sm text-muted">
              Получите справку с подтверждёнными сведениями о действующем
              назначении.
            </p>
          </section>
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ["Кому доступна", "Сотрудникам с действующим назначением"],
              ["Что понадобится", "Выбрать назначение, язык и адресата"],
              ["Результат", "Документ в разделе «Мои заявки»"],
              ["Срок исполнения", "По опубликованному паспорту услуги"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.08em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="aiu-panel p-6">
          <h2 className="font-display text-2xl text-ink">Подать заявку</h2>
          <p className="mt-2 text-sm text-muted">
            Профиль подтверждён. Вы сможете сохранить черновик и продолжить
            позднее.
          </p>
          <Link href="/services/hr-01/apply" className="aiu-btn-primary mt-6 w-full">
            Начать оформление
          </Link>
          <p className="mt-4 text-xs text-muted">
            Версия услуги 1.0. Правила на дату подачи сохранятся в вашей заявке.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
