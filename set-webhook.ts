import { Api } from "grammy/mod.ts";
import { config } from "./env.ts";

const api = new Api(config.telegram.token);

await api.setWebhook(Deno.args[0])
  .then(console.log);
