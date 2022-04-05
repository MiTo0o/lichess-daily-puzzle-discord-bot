import { Client, MessageEmbed, TextChannel } from "discord.js";
import { GuildInterface } from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";
import { getAllChannelData } from "./getAllChannelData";
import { getDailyPuzzleEmbed } from "./getDailyPuzzleEmbed";

export const checkAndSendDailyPuzzle = async (BOT: Client) => {
  try {
    const allChannelData = await getAllChannelData();
    const dailyPuzzleEmbed = await getDailyPuzzleEmbed();
    const currentDateTime = new Date();
    const currentUTCHour = currentDateTime.getUTCHours();
    const currentUTCMinute = currentDateTime.getUTCMinutes();

    for (const channelData of allChannelData as GuildInterface[]) {
      const channelID = channelData.channelId;
      const channelUTCHour = channelData.dailyUpdateTime.UCTHour;
      const channelUTCMinute = channelData.dailyUpdateTime.UCTMinute;

      if (
        currentUTCHour === channelUTCHour &&
        currentUTCMinute === channelUTCMinute
      ) {
        const channel = await BOT.channels.cache.get(channelID);
        // Continue if channel is somehow not valid or inaccessible
        if (!channel) {
          continue;
        } else {
          (channel as TextChannel).send({
            embeds: [dailyPuzzleEmbed as MessageEmbed],
          });
        }
      }
    }
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
