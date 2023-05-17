import { WebhookClient } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";

/**
 * Validates that the environment variables are present.
 *
 * @returns {ExtendedClient['env']} The bot's environment cache.
 */
export const validateEnv = (): ExtendedClient["env"] => {
  if (
    !process.env.TOKEN ||
    !process.env.DEBUG_HOOK ||
    !process.env.HOME_GUILD ||
    !process.env.POST_CHANNEL
  ) {
    throw new Error(
      "Missing environment variables. Please check the README.md for more information."
    );
  }
  return {
    token: process.env.TOKEN,
    debugHook: new WebhookClient({ url: process.env.DEBUG_HOOK }),
    homeGuild: process.env.HOME_GUILD,
    postChannel: process.env.POST_CHANNEL,
  };
};
