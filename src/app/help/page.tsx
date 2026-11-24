"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/ui";
import { useSession } from "@/lib/session";

export default function HelpPage() {
  const { signedIn } = useSession();

  const content = (
    <>
      <PageHeader
        eyebrow="Состояния / X01"
        title="Справка и поддержка"
        description="Инструкции по услугам, подаче заявлений и работе с документами."
      />
      <div className="aiu-panel p-6">
        <h2 className="font-display text-2xl text-ink">
          Найдите ответ или отправьте обращение
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          <li>Как войти через университетский SSO</li>
          <li>Как подать заявление на общежитие и отслеживать статус</li>
          <li>Как ответить на запрос уточнения по кадровой заявке</li>
          <li>Почему поля из кадровой и академической ИС доступны только для чтения</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/services/it-01" className="aiu-btn-primary">
            Открыть обращение
          </Link>
          <Link href="/atlas" className="aiu-btn-secondary">
            Каталог экранов атласа
          </Link>
        </div>
      </div>
    </>
  );

  if (!signedIn) {
    return <div className="aiu-shell mx-auto max-w-3xl px-4 py-10">{content}</div>;
  }

  return <AppShell area="Справка">{content}</AppShell>;
}
