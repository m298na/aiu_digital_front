"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Field, PageHeader } from "@/components/ui";
import { demoUser } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const steps = ["Данные", "Документы", "Проверка"];

export default function DormApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow={`Общежития / S0${step === 0 ? "3" : step === 1 ? "4" : "8"}`}
        title={
          step === 0
            ? "Заявление на общежитие"
            : step === 1
              ? "Документы к заявлению"
              : "Проверка перед отправкой"
        }
        description={`Шаг ${step + 1} из 3 · ${
          step === 0
            ? "Профиль и предпочтения"
            : step === 1
              ? "Список зависит от выбранной категории"
              : "После подачи сохранится версия ваших данных"
        }`}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              index === step
                ? "bg-brand text-white"
                : index < step
                  ? "bg-brand/10 text-brand"
                  : "bg-canvas text-muted",
            )}
            onClick={() => setStep(index)}
          >
            {index + 1} {label}
          </button>
        ))}
      </div>

      {step === 0 ? (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="aiu-panel space-y-4 p-6">
            <Field label="ФИО">
              <div className="aiu-readonly">{demoUser.name}</div>
            </Field>
            <Field label="Программа">
              <div className="aiu-readonly">{demoUser.program}</div>
            </Field>
            <Field label="Предпочтительный корпус">
              <select className="aiu-input" defaultValue="1">
                <option value="1">Корпус 1</option>
                <option value="2">Корпус 2</option>
              </select>
            </Field>
            <Field label="Категория заявления">
              <select className="aiu-input" defaultValue="">
                <option value="" disabled>
                  Выберите категорию
                </option>
                <option value="general">По правилам кампании</option>
                <option value="priority">Льготная категория</option>
              </select>
            </Field>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="aiu-btn-primary"
                onClick={() => setStep(1)}
              >
                Далее: документы
              </button>
              <button type="button" className="aiu-btn-secondary">
                Сохранить черновик
              </button>
            </div>
          </div>
          <aside className="aiu-panel space-y-4 p-6 text-sm text-muted">
            <p>
              Данные из академической ИС. Обновлено 01.07.2027, 09:00. При ошибке
              обратитесь в учебный офис.
            </p>
            <p>
              Предпочтение учитывается при наличии подходящих мест. Это не бронь.
            </p>
          </aside>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="aiu-panel space-y-4 p-6">
          <div className="rounded-card border border-dashed border-line bg-canvas/60 px-4 py-8 text-center">
            <p className="font-medium text-ink">
              Перетащите файл или выберите на устройстве
            </p>
            <p className="mt-2 text-sm text-muted">
              Типы, размер и количество — по правилам кампании
            </p>
            <input className="aiu-input mx-auto mt-4 max-w-md" type="file" />
          </div>
          <div className="space-y-2">
            <div className="rounded-card border border-line px-4 py-3 text-sm">
              Подтверждение_01.pdf · Проверено
            </div>
            <div className="rounded-card border border-line px-4 py-3 text-sm">
              Подтверждение_02.pdf · Проверяется
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="aiu-btn-primary"
              onClick={() => setStep(2)}
            >
              Далее: проверить
            </button>
            <button
              type="button"
              className="aiu-btn-secondary"
              onClick={() => setStep(0)}
            >
              Назад
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="aiu-panel space-y-4 p-6">
          <h2 className="font-display text-2xl text-ink">Сводка заявления</h2>
          <dl className="grid gap-3 sm:grid-cols-3">
            {[
              ["Студент", demoUser.name],
              ["Предпочтение", "Корпус 1"],
              ["Категория", "По правилам кампании"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.08em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted">Документы: 2 файла проверены</p>
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              className="mt-1"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
            />
            Я проверил(а) указанные сведения.
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="aiu-btn-primary"
              disabled={!confirmed}
              onClick={() => router.push("/applications/DU-0021")}
            >
              Подать заявление
            </button>
            <button
              type="button"
              className="aiu-btn-secondary"
              onClick={() => setStep(1)}
            >
              Вернуться к документам
            </button>
          </div>
          <Link href="/dormitory" className="text-sm font-medium text-brand hover:underline">
            К разделу общежития
          </Link>
        </div>
      ) : null}
    </AppShell>
  );
}
