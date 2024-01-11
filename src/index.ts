import { Client } from "discord.js";
import { scheduleJob } from "node-schedule";

import { IntentOptions } from "./config/IntentOptions";
import { ExtendedClient } from "./interfaces/ExtendedClient";
import { postMessage } from "./utils/postMessage";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  const bot = new Client({ intents: IntentOptions }) as ExtendedClient;
  bot.env = validateEnv();

  bot.on("ready", async () => {
    await bot.env.debugHook.send({
      content: `Bot has authenticated as ${bot.user?.tag}`,
      username: bot.user?.username ?? "100 Days of Code",
      avatarURL:
        bot.user?.displayAvatarURL() ??
        "https://cdn.nhcarrigan.com/avatars/nhcarrigan.png",
    });
    scheduleJob("0 7 * * *", async () => {
      await postMessage(bot);
    });
  });

  bot.on("messageCreate", async (message) => {
    if (
      message.author.id === "465650873650118659" &&
      message.content === "~post"
    ) {
      await postMessage(bot);
    }
  });

  await bot.login(bot.env.token);
})();
