import { Api } from "grammy/mod.ts";
import { config } from "./env.ts";

const url = Deno.args[0];
console.log(`Setting webhook to ${url} with secret ${config.telegram.secret}`);

const api = new Api(config.telegram.token);

await api.setWebhook(url, { secret_token: config.telegram.secret })
  .then(console.log);
