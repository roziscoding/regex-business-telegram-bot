import { webhookCallback } from "grammy/mod.ts";
import { getBot } from "./bot.ts";
import { config } from "./env.ts";

const bot = getBot();

Deno.serve(webhookCallback(
  bot,
  "std/http",
  {
    secretToken: config.telegram.secret,
  },
));
