import { Client, MessageEmbed, TextChannel } from "discord.js";
import { GuildInterface } from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";
import { getAllChannelData } from "./getAllChannelData";
import { getDailyPuzzleEmbed } from "./getDailyPuzzleEmbed";

export const checkAndSendDailyPuzzle = async (BOT: Client) => {
  try {
    const allChannelData = await getAllChannelData();
    const dailyPuzzleEmbed = await getDailyPuzzleEmbed();

    for (const channelData of allChannelData as GuildInterface[]) {
      const channelID = channelData.channelId;
      const channel = await BOT.channels.cache.get(channelID);
      // If the bot was kicked out, channel will return undefined
      if (!channel) {
        continue;
      } else {
        (channel as TextChannel).send({
          embeds: [dailyPuzzleEmbed as MessageEmbed],
        });
      }
    }
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
