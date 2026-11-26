/**
 * Compatibility re-exports. Prefer `@/lib/api/*` and `@/lib/data/store` in new code.
 */
export type { Role, ApplicationStatus } from "@/lib/types";
export {
  roleLabels,
  statusLabels,
  statusStyles,
} from "@/lib/types";

export {
  profileDefaults as demoUser,
  servicesCatalog as services,
  applicationsStore as applications,
  notificationsStore as notifications,
  hrQueueStore as hrQueue,
  employeesStore as employees,
  dormQueueStore as dormQueue,
  placementsStore as placements,
  roomsStore as rooms,
  scienceStore as scienceResults,
  studentsStore as students,
  atlasScreens,
} from "@/lib/data/store";
