"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";

export default function CampaignPage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / S02"
        title="Кампания общежитий 2027/28"
        description="Проект условий · Даты и правила в макете приведены для примера."
      />

      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="aiu-panel space-y-5 p-6">
          <h2 className="font-display text-2xl text-ink">Перед подачей заявления</h2>
          {[
            ["Период подачи", "01 июля – 15 августа 2027 · демонстрация"],
            [
              "Кто может подать",
              "Категории определяются опубликованными правилами кампании",
            ],
            [
              "Необходимые документы",
              "Перечень зависит от категории и заявленных оснований",
            ],
            [
              "Как назначают место",
              "Сначала проверка, затем очередь по утверждённым правилам",
            ],
          ].map(([title, text]) => (
            <div key={title}>
              <p className="text-sm font-medium text-ink">{title}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>

        <div className="aiu-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700">
            Проверка профиля
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink">Статус подтверждён</h2>
          <p className="mt-2 text-sm text-muted">
            Информационные системы · 2 курс · Активный студент
          </p>
          <Link href="/dormitory/apply" className="aiu-btn-primary mt-6 w-full">
            Заполнить заявление
          </Link>
          <p className="mt-4 text-xs text-muted">
            Одна заявка на кампанию. Исправления сохраняются как новые версии
            существующей заявки.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
