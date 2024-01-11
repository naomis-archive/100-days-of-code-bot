import { DailyMessage } from "../config/DailyMessage";
import { ExtendedClient } from "../interfaces/ExtendedClient";

/**
 * Module to send the daily message to the specified channel.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 * @async
 */
export const postMessage = async (bot: ExtendedClient) => {
  const guild =
    bot.guilds.cache.get(bot.env.homeGuild) ||
    (await bot.guilds.fetch(bot.env.homeGuild));
  const channel =
    guild.channels.cache.get(bot.env.postChannel) ||
    (await guild.channels.fetch(bot.env.postChannel));
  if (!channel || !("send" in channel)) {
    await bot.env.debugHook.send({
      content:
        "The channel specified in POST_CHANNEL does not exist or is not a text channel.",
      username: bot.user?.username ?? "100 Days of Code",
      avatarURL:
        bot.user?.displayAvatarURL() ??
        "https://cdn.nhcarrigan.com/avatars/nhcarrigan.png",
    });
    return;
  }
  await channel.send({
    content: DailyMessage,
    allowedMentions: { roles: ["1108444569198137425"] },
  });
};
