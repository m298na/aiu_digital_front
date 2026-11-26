import { z } from "zod";

export const dormBuildingOptions = [
  { value: "1", label: "Корпус 1" },
  { value: "2", label: "Корпус 2" },
] as const;

export const dormCategoryOptions = [
  { value: "general", label: "По правилам кампании" },
  { value: "priority", label: "Льготная категория" },
] as const;

export const dormApplySchema = z.object({
  building: z.enum(["1", "2"], {
    message: "Выберите предпочтительный корпус",
  }),
  category: z.enum(["general", "priority"], {
    message: "Выберите категорию заявления",
  }),
  confirmed: z.literal(true, {
    message: "Подтвердите проверку сведений",
  }),
});

export type DormApplyValues = z.infer<typeof dormApplySchema>;

export function buildingLabel(value: string): string {
  return dormBuildingOptions.find((item) => item.value === value)?.label ?? value;
}

export function categoryLabel(value: string): string {
  return (
    dormCategoryOptions.find((item) => item.value === value)?.label ?? value
  );
}
