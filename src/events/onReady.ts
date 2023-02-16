import dotenv from "dotenv";
import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { Routes } from "discord-api-types/v10";
import { checkAndSendDailyPuzzle } from "../modules/checkAndSendDailyPuzzle";
import { setMemberCount } from "../modules/setMemberCount";
import { errorHandler } from "../utils/handleError";

dotenv.config();

export const onReady = async (BOT: Client) => {
  try {
    const rest = new REST({ version: "10" }).setToken(
      process.env.BOT_TOKEN as string
    );
    const commandData = CommandList.map((command) => command.data.toJSON());

    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_TOKEN as string),
      { body: commandData }
    );

    
    setMemberCount(BOT);
    // runs every hour, passes BOT(client) into the function
    setInterval(setMemberCount, 6000000, BOT);
    // runs every minute, passes BOT(client) into the function
    setInterval(checkAndSendDailyPuzzle, 60000, BOT);

    console.log("Discord ready!");
  } catch (error) {
    errorHandler(error as Error);
  }
};
