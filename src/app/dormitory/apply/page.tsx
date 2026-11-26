"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { AppShell } from "@/components/app-shell";
import { useActionFeedback } from "@/components/action-toast";
import { Field, PageHeader } from "@/components/ui";
import { profileDefaults } from "@/lib/data/store";
import {
  buildingLabel,
  categoryLabel,
  dormApplySchema,
  dormBuildingOptions,
  dormCategoryOptions,
  type DormApplyValues,
} from "@/lib/schemas/dormitory";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

const steps = ["Данные", "Документы", "Проверка"];

export default function DormApplyPage() {
  const router = useRouter();
  const { user } = useSession();
  const [step, setStep] = useState(0);
  const { notify, Feedback } = useActionFeedback();

  const form = useForm<DormApplyValues>({
    resolver: zodResolver(dormApplySchema),
    defaultValues: {
      building: "1",
      category: undefined,
      confirmed: undefined,
    },
    mode: "onTouched",
  });

  const building = useWatch({ control: form.control, name: "building" });
  const category = useWatch({ control: form.control, name: "category" });
  const displayName = user?.name ?? profileDefaults.name;

  async function goToDocuments() {
    const ok = await form.trigger(["building", "category"]);
    if (!ok) {
      notify("Заполните корпус и категорию заявления.");
      return;
    }
    setStep(1);
  }

  async function submitApplication() {
    const ok = await form.trigger();
    if (!ok) {
      notify("Проверьте обязательные поля перед отправкой.");
      return;
    }
    router.push("/applications/DU-0021");
  }

  return (
    <AppShell area="Общежития">
      <Feedback />
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
            onClick={() => {
              if (index > step) return;
              setStep(index);
            }}
          >
            {index + 1} {label}
          </button>
        ))}
      </div>

      {step === 0 ? (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="aiu-panel space-y-4 p-6"
            onSubmit={(event) => {
              event.preventDefault();
              void goToDocuments();
            }}
          >
            <Field label="ФИО">
              <div className="aiu-readonly">{displayName}</div>
            </Field>
            <Field label="Программа">
              <div className="aiu-readonly">{profileDefaults.program}</div>
            </Field>
            <Field label="Предпочтительный корпус" htmlFor="building">
              <select
                id="building"
                className="aiu-input"
                {...form.register("building")}
              >
                {dormBuildingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.building ? (
                <span className="mt-1.5 block text-xs text-red-700">
                  {form.formState.errors.building.message}
                </span>
              ) : null}
            </Field>
            <Field label="Категория заявления" htmlFor="category">
              <select
                id="category"
                className="aiu-input"
                {...form.register("category")}
                defaultValue=""
              >
                <option value="" disabled>
                  Выберите категорию
                </option>
                {dormCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.category ? (
                <span className="mt-1.5 block text-xs text-red-700">
                  {form.formState.errors.category.message}
                </span>
              ) : null}
            </Field>
            <div className="flex flex-wrap gap-2">
              <button type="submit" className="aiu-btn-primary">
                Далее: документы
              </button>
              <button
                type="button"
                className="aiu-btn-secondary"
                onClick={() => notify("Черновик заявления сохранён.")}
              >
                Сохранить черновик
              </button>
            </div>
          </form>
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
          <p className="text-sm text-muted">
            Категория:{" "}
            <span className="font-medium text-ink">
              {category ? categoryLabel(category) : "не выбрана"}
            </span>
          </p>
          <div className="rounded-card border border-dashed border-line bg-canvas/60 px-4 py-8 text-center">
            <p className="font-medium text-ink">
              Перетащите файл или выберите на устройстве
            </p>
            <p className="mt-2 text-sm text-muted">
              Типы, размер и количество — по правилам кампании
            </p>
            <input
              className="aiu-input mx-auto mt-4 max-w-md"
              type="file"
              name="documents"
              onChange={() => notify("Файл добавлен в заявление.")}
            />
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
              ["Студент", displayName],
              ["Предпочтение", building ? buildingLabel(building) : "—"],
              ["Категория", category ? categoryLabel(category) : "—"],
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
              {...form.register("confirmed")}
            />
            Я проверил(а) указанные сведения.
          </label>
          {form.formState.errors.confirmed ? (
            <p className="text-xs text-red-700">
              {form.formState.errors.confirmed.message}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="aiu-btn-primary"
              onClick={() => void submitApplication()}
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
          <Link
            href="/dormitory"
            className="text-sm font-medium text-brand hover:underline"
          >
            К разделу общежития
          </Link>
        </div>
      ) : null}
    </AppShell>
  );
}
