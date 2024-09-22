import { getBot } from "./bot.ts";

const bot = getBot();

bot.start({
  onStart: (me) => {
    console.log(`Listening as @${me.username}`);
  },
});
