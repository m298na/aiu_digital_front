"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/ui";

export default function AnalyticsPage() {
  return (
    <AppShell area="Аналитика">
      <PageHeader
        eyebrow="Аналитика / B01"
        title="Аналитика университета"
        description="Срез на 10 июля 2027 · Демонстрационная выборка"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["Обзор", "Контингент", "Кадровые услуги", "Общежития"].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={index === 0 ? "aiu-btn-primary" : "aiu-btn-secondary"}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Активные студенты" value="8 420" hint="По определению ДАП" />
        <StatCard label="Занятость общежитий" value="77,5%" hint="620 из 800 мест" />
        <StatCard label="Свободные места" value="80" hint="Без броней и заселений" />
        <StatCard label="Заявки исполнены" value="124" hint="Ноябрь 2026" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="aiu-panel p-6">
          <h2 className="font-display text-2xl text-ink">Общежития по статусам</h2>
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ["Заселено", "620"],
              ["Бронь", "100"],
              ["Свободно", "80"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-line pb-2">
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="aiu-panel p-6">
          <h2 className="font-display text-2xl text-ink">Качество данных</h2>
          <p className="mt-3 text-sm text-muted">3 задачи сверки</p>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            <li>Кадровая ИС · 09:15</li>
            <li>Академическая ИС · 08:50</li>
            <li>Финансовая ИС · 11:00</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" className="aiu-btn-secondary">
              Определения показателей
            </button>
            <button type="button" className="aiu-btn-primary">
              Экспорт текущего среза
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
