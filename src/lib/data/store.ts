import type { ApplicationStatus, Role } from "@/lib/types";

export type Application = {
  id: string;
  service: string;
  status: ApplicationStatus;
  nextStep: string;
  due: string;
  updated: string;
  submittedAt: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  href: string;
  unread: boolean;
};

export type ServiceItem = {
  id: string;
  code: string;
  title: string;
  description: string;
  audience: Role[];
  href: string;
};

export const profileDefaults = {
  name: "Алия Тестова",
  initials: "АТ",
  emailStudent: "demo.student@example.edu",
  emailEmployee: "demo.employee@example.edu",
  program: "Информационные системы",
  course: "2 курс",
  department: "Департамент цифровизации",
  position: "Специалист",
  studentId: "DEMO-001",
  employeeId: "EMP-DEMO-001",
};

export const servicesCatalog: ServiceItem[] = [
  {
    id: "hr-01",
    code: "HR",
    title: "Справка с места работы",
    description: "Назначение, язык и адресата",
    audience: ["employee"],
    href: "/services/hr-01",
  },
  {
    id: "hr-02",
    code: "HR",
    title: "Уточнение кадровых данных",
    description: "Предложите исправление с основанием",
    audience: ["employee"],
    href: "/services/hr-02",
  },
  {
    id: "hr-03",
    code: "HR",
    title: "Копия кадрового документа",
    description: "Защищённая копия за выбранный период",
    audience: ["employee"],
    href: "/services/hr-03",
  },
  {
    id: "dor-01",
    code: "DOR",
    title: "Общежитие",
    description: "Подача заявления и статус размещения",
    audience: ["student", "employee"],
    href: "/dormitory",
  },
  {
    id: "it-01",
    code: "IT",
    title: "Обращение в подразделение",
    description: "Выберите тему и опишите вопрос",
    audience: ["student", "employee"],
    href: "/services/it-01",
  },
  {
    id: "help-01",
    code: "HELP",
    title: "Помощь по услугам",
    description: "Правила, документы и ответы",
    audience: ["student", "employee"],
    href: "/help",
  },
];

/** Source of truth for application statuses */
export const applicationsStore: Application[] = [
  {
    id: "HR-0048",
    service: "Справка с места работы",
    status: "done",
    nextStep: "Скачать результат",
    due: "16 ноя",
    updated: "16 ноября",
    submittedAt: "14.11.2026",
  },
  {
    id: "HR-0052",
    service: "Уточнение данных",
    status: "clarification",
    nextStep: "Исправить поля",
    due: "19 ноя",
    updated: "Сегодня, 09:10",
    submittedAt: "17.11.2026",
  },
  {
    id: "DU-0021",
    service: "Общежитие",
    status: "approved",
    nextStep: "Ожидать назначения места",
    due: "По кампании",
    updated: "Сегодня, 10:40",
    submittedAt: "01.07.2027",
  },
  {
    id: "DRAFT-DOC",
    service: "Копия документа",
    status: "draft",
    nextStep: "Продолжить",
    due: "—",
    updated: "Вчера",
    submittedAt: "—",
  },
];

export const notificationsStore: NotificationItem[] = [
  {
    id: "n1",
    title: "Требуется исправление",
    body: "HR-0052 · Ответьте до 19 ноября",
    href: "/applications/HR-0052",
    unread: true,
  },
  {
    id: "n2",
    title: "Справка готова",
    body: "HR-0048 · Результат доступен в заявке",
    href: "/applications/HR-0048",
    unread: true,
  },
  {
    id: "n3",
    title: "Заявление одобрено",
    body: "DU-0021 · Включено в очередь",
    href: "/applications/DU-0021",
    unread: true,
  },
  {
    id: "n4",
    title: "Приём заявлений открыт",
    body: "Кампания 2027/28 · Условия опубликованы",
    href: "/dormitory/campaign",
    unread: true,
  },
];

export const hrQueueStore = [
  {
    id: "HR-0052",
    service: "Уточнение",
    applicant: "Алия Тестова",
    assignee: "Специалист 01",
    status: "in_review" as ApplicationStatus,
    due: "Сегодня",
  },
  {
    id: "HR-0056",
    service: "Справка",
    applicant: "Демо-сотрудник 02",
    assignee: "Не назначен",
    status: "submitted" as ApplicationStatus,
    due: "Завтра",
  },
  {
    id: "HR-0041",
    service: "Копия",
    applicant: "Демо-сотрудник 03",
    assignee: "Специалист 02",
    status: "rejected" as ApplicationStatus,
    due: "Вчера",
  },
];

export const employeesStore = [
  {
    name: "Алия Тестова",
    unit: "Цифровизация",
    position: "Специалист",
    contract: "Действует",
    freshness: "17.11, 09:15",
  },
  {
    name: "Демо-сотрудник 02",
    unit: "Высшая школа 01",
    position: "Преподаватель",
    contract: "Действует",
    freshness: "17.11, 09:15",
  },
  {
    name: "Демо-сотрудник 03",
    unit: "Высшая школа 02",
    position: "Специалист",
    contract: "Завершён",
    freshness: "16.11, 18:00",
  },
];

export const dormQueueStore = [
  {
    place: 1,
    id: "DU-0021",
    rank: "Категория по правилам",
    submitted: "01 июл, 10:14",
    fit: "Подходит",
  },
  {
    place: 2,
    id: "DU-0028",
    rank: "Категория по правилам",
    submitted: "01 июл, 10:25",
    fit: "Подходит",
  },
  {
    place: 3,
    id: "DU-0033",
    rank: "Общий порядок",
    submitted: "01 июл, 10:40",
    fit: "Нет места",
  },
];

export const placementsStore = [
  {
    student: "Алия Тестова",
    place: "1 / 204 / 2",
    interval: "10.07.27 – 30.06.28",
    status: "reserved" as ApplicationStatus,
    action: "Заселить",
  },
  {
    student: "Демо-студент 02",
    place: "1 / 205 / 1",
    interval: "10.07.27 – 30.06.28",
    status: "settled" as ApplicationStatus,
    action: "Переселить",
  },
  {
    student: "Демо-студент 03",
    place: "1 / 206 / 3",
    interval: "01.07.27 – 31.07.27",
    status: "settled" as ApplicationStatus,
    action: "Оформить выезд",
  },
];

export const roomsStore = ["201", "202", "203", "204", "205", "206", "207", "208"];

export const scienceStore = [
  {
    title: "Исследование цифрового кампуса",
    year: 2026,
    authors: "2 участия",
    doi: "10.demo/aiu.001",
    status: "Подтверждено",
  },
  {
    title: "Модель сервисов университета",
    year: 2026,
    authors: "3 участия",
    doi: "Без DOI",
    status: "На проверке",
  },
  {
    title: "Данные образовательной среды",
    year: 2025,
    authors: "1 участие",
    doi: "10.demo/aiu.003",
    status: "Уточнение",
  },
];

export const studentsStore = [
  {
    name: "Алия Тестова",
    program: "Информационные системы",
    course: "2",
    status: "Активный",
    freshness: "17.11, 08:50",
  },
  {
    name: "Демо-студент 02",
    program: "Педагогика",
    course: "3",
    status: "Активный",
    freshness: "17.11, 08:50",
  },
  {
    name: "Демо-студент 03",
    program: "Экономика",
    course: "1",
    status: "Требует сверки",
    freshness: "16.11, 18:00",
  },
];

export const atlasScreens = [
  { id: "AUTH", title: "Вход через SSO", href: "/" },
  { id: "ROLE", title: "Выбор роли", href: "/role" },
  { id: "D01", title: "Главная · студент", href: "/home?role=student" },
  { id: "D02", title: "Главная · сотрудник", href: "/home?role=employee" },
  { id: "D03", title: "Личный профиль", href: "/profile" },
  { id: "C01", title: "Каталог услуг", href: "/services" },
  { id: "C02", title: "Паспорт услуги HR-01", href: "/services/hr-01" },
  { id: "C03", title: "Заявка на справку", href: "/services/hr-01/apply" },
  { id: "C06", title: "Мои заявки", href: "/applications" },
  { id: "C07", title: "Заявка HR-0048", href: "/applications/HR-0048" },
  { id: "C08", title: "Уточнение HR-0052", href: "/applications/HR-0052" },
  { id: "C09", title: "Уведомления", href: "/notifications" },
  { id: "H01", title: "Очередь HR", href: "/hr/queue" },
  { id: "H06", title: "Реестр сотрудников", href: "/hr/employees" },
  { id: "S01", title: "Моё общежитие", href: "/dormitory" },
  { id: "S02", title: "Кампания 2027/28", href: "/dormitory/campaign" },
  { id: "S03", title: "Заявление · шаг 1", href: "/dormitory/apply" },
  { id: "S05", title: "Заявление DU-0021", href: "/applications/DU-0021" },
  { id: "S06", title: "Назначенное место", href: "/dormitory/placement" },
  { id: "S07", title: "Начисления", href: "/dormitory/charges" },
  { id: "O01", title: "Обзор общежитий", href: "/operator" },
  { id: "O05", title: "Очередь размещения", href: "/operator/queue" },
  { id: "O07", title: "Фонд мест", href: "/operator/rooms" },
  { id: "O08", title: "Размещения", href: "/operator/placements" },
  { id: "N01", title: "Научный реестр", href: "/science" },
  { id: "T01", title: "Реестр студентов", href: "/students" },
  { id: "B01", title: "Аналитика", href: "/analytics" },
  { id: "A01", title: "Администрирование", href: "/admin" },
  { id: "ATLAS", title: "Каталог экранов", href: "/atlas" },
];

export function getApplicationStats(items: Application[]) {
  return {
    active: items.filter((item) =>
      ["submitted", "in_review", "clarification", "approved"].includes(item.status),
    ).length,
    needsResponse: items.filter((item) => item.status === "clarification").length,
    done: items.filter((item) => item.status === "done").length,
    drafts: items.filter((item) => item.status === "draft").length,
    unreadNotifications: notificationsStore.filter((item) => item.unread).length,
  };
}
