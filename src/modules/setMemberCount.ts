import { Client } from "discord.js";
import { errorHandler } from "../utils/handleError";

export const setMemberCount = async (BOT: Client) => {
  try {
    const memberCount = BOT.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c);
    
    BOT.user?.setPresence({
        activities: [{ name: `${memberCount} users | /help`, type: "LISTENING" }],
        status: "online",
    });
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
