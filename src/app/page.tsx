"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { useSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const { ready, signedIn, role, signIn } = useSession();

  useEffect(() => {
    if (!ready) return;
    if (signedIn && role) router.replace("/home");
    else if (signedIn) router.replace("/role");
  }, [ready, signedIn, role, router]);

  return (
    <div className="aiu-shell">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative overflow-hidden px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(210,174,109,0.22),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(57,49,133,0.18),transparent_40%)]" />
          <div className="relative flex h-full max-w-xl flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Astana International University
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
                Ваш университет.
                <br />
                В одном пространстве.
              </h1>
              <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
                Услуги, документы и общежитие — с понятным статусом на каждом
                шаге.
              </p>
              <ol className="mt-10 space-y-4 text-sm text-ink">
                {[
                  "Одна университетская учётная запись",
                  "Заявки и документы под рукой",
                  "История каждого решения",
                ].map((item, index) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-12 text-sm text-muted">
              Язык интерфейса: русский · Демонстрационный прототип
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white/70 px-6 py-12 backdrop-blur lg:px-12">
          <div className="aiu-panel w-full max-w-md animate-rise p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Добро пожаловать
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              Войдите через учётную запись университета
            </h2>
            <p className="mt-3 text-sm text-muted">
              Пароль вводится только на странице университетского провайдера
              входа.
            </p>

            <button
              type="button"
              className="aiu-btn-primary mt-8 w-full"
              onClick={() => {
                signIn();
                router.push("/role");
              }}
            >
              Войти через университетский SSO
            </button>

            <div className="mt-5 flex items-start gap-3 rounded-card border border-line bg-canvas/80 p-4 text-sm text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <p>
                Защищённый вход. В этом прототипе SSO имитируется и не требует
                реальных учётных данных.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/help" className="font-medium text-brand hover:underline">
                Не получается войти?
              </Link>
              <Link href="/atlas" className="font-medium text-muted hover:text-brand">
                Открыть атлас экранов
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
