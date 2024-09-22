import { Bot } from "grammy/mod.ts";
import { config } from "./env.ts";

export type SessionData = {
  businessConnectionUser: number;
};

export function getBot() {
  const bot = new Bot(config.telegram.token);

  const PATTERN_REGEX = /^s\/(?<search>[^/]+)\/(?<replace>[^/]+)\/(?<flags>[igw]+)?$/;

  bot.on(["business_message:text", "edited_business_message:text"], (ctx) => {
    const businessMessage = ctx.businessMessage ?? ctx.editedBusinessMessage;
    const replyToMessage = businessMessage.reply_to_message;

    if (!replyToMessage) return;

    const match = PATTERN_REGEX.exec(businessMessage.text);

    if (!match?.groups?.search || !match.groups?.replace) return;

    const oldMessageText = replyToMessage.text;

    if (!oldMessageText) return;

    const regex = new RegExp(match.groups.search, match.groups.flags);

    const newMessageText = oldMessageText.replace(regex, match.groups.replace);

    return ctx.reply(newMessageText, {
      reply_parameters: { message_id: businessMessage.message_id },
    });
  });

  return bot;
}
