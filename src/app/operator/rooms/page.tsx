"use client";

import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";
import { rooms } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const bedState = (room: string, bed: number) => {
  if (room === "204" && bed === 2) return "reserved";
  if (room === "205" && bed === 1) return "occupied";
  if (room === "206" && bed === 3) return "occupied";
  if (room === "203" && bed > 2) return "repair";
  return "free";
};

const colors = {
  occupied: "bg-brand text-white",
  reserved: "bg-accent text-ink",
  free: "bg-white text-muted border border-line",
  repair: "bg-slate-200 text-slate-500",
};

export default function RoomsPage() {
  return (
    <AppShell area="Общежития">
      <PageHeader
        eyebrow="Общежития / O07"
        title="Фонд комнат и мест"
        description="Корпус 1 · Показан срез на 10 июля 2027"
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input className="aiu-input pl-10" placeholder="Номер комнаты" />
        </div>
        <select className="aiu-input sm:max-w-40" defaultValue="2">
          <option value="2">Этаж 2</option>
          <option value="1">Этаж 1</option>
        </select>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-brand" /> Заселено
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-accent" /> Бронь
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-line bg-white" /> Свободно
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-slate-200" /> Ремонт
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rooms.map((room) => (
          <div key={room} className="aiu-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">Комната {room}</h2>
              <span className="text-xs text-muted">4 места</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((bed) => {
                const state = bedState(room, bed);
                return (
                  <div
                    key={bed}
                    className={cn(
                      "flex h-10 items-center justify-center rounded-lg text-sm font-medium",
                      colors[state],
                    )}
                  >
                    {bed}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted">Жилое помещение</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
