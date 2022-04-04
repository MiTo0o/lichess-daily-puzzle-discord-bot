import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { Routes } from "discord-api-types/v10";
import { checkAndSendDailyPuzzle } from "../modules/checkAndSendDailyPuzzle";

export const onReady = async (BOT: Client) => {
  const rest = new REST({ version: "10" }).setToken(
    process.env.BOT_TOKEN as string
  );
  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationCommands(process.env.DISCORD_CLIENT_TOKEN as string),
    { body: commandData }
  );

  // runs every minute, passes BOT into the function
  setInterval(checkAndSendDailyPuzzle, 60000, BOT);

  console.log("Discord ready!");
};
