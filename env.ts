import { z } from "zod";

const AppConfig = z.object({
  TELEGRAM_TOKEN: z.string(),
}).transform((env) => ({
  telegram: {
    token: env.TELEGRAM_TOKEN,
    secret: env.TELEGRAM_TOKEN.replace(/[^0-9a-z_]/g, ""),
  },
}));

export type AppConfig = z.infer<typeof AppConfig>;

export const config = AppConfig.parse(Deno.env.toObject());
