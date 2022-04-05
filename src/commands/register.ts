import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { setChannelData } from "../modules/setChannelData";
import { MessageEmbed, ColorResolvable } from "discord.js";
import { errorHandler } from "../utils/handleError";

export const register: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Receive daily chess puzzles in this channel"),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const currentDateTime = new Date();
      const currentUTCHour = currentDateTime.getUTCHours();
      const currentUTCMinute = currentDateTime.getUTCMinutes();

      let description = `The daily puzzle will be posted at **${currentUTCHour}:${currentUTCMinute} UTC**
      If you want to change this, use the \`/setpuzzletime\` command`;
      let embedColor = "#0099ff";
      let status = "Successfully registerd";

      const result = await setChannelData(
        interaction.channelId,
        interaction.guildId as string,
        currentUTCHour,
        currentUTCMinute
      );

      // If result is not null, it means the server is already registered
      if (result !== null) {
        description = `This channel is already registered
        If you wanted to set the daily puzzle post time, use the \`/setpuzzletime\` command`;
        embedColor = "#ff0000";
        status = "Failed to register";
      }

      const replyEmbed = new MessageEmbed()
        .setColor(embedColor as ColorResolvable)
        .setTitle(status)
        .setDescription(description)
        .setTimestamp();

      interaction.editReply({ embeds: [replyEmbed] });
    } catch (error) {
      errorHandler(error as Error);
    }
  },
};
