import { z } from "zod";

export const hrCertificateSchema = z.object({
  purpose: z.string().min(2, "Укажите назначение справки"),
  language: z.enum(["ru", "kk", "en"], {
    message: "Выберите язык",
  }),
  recipient: z.string().min(2, "Укажите адресата"),
});

export type HrCertificateValues = z.infer<typeof hrCertificateSchema>;
