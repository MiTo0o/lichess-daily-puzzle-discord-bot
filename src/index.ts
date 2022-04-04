import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import { onGuildDelete } from "./events/onGuildDelete";
import * as Sentry from "@sentry/node";

(async () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });

  const BOT = new Client({ intents: IntentOptions });

  await connectDatabase();

  BOT.on("ready", async () => await onReady(BOT));

  BOT.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

  BOT.on("guildDelete", async (guild) => await onGuildDelete(guild));

  await BOT.login(process.env.BOT_TOKEN);
})();
