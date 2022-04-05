import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, ColorResolvable } from "discord.js";
import { getChannelData } from "../modules/getChannelData";
import { updateChannelData } from "../modules/updateChannelData";
import { errorHandler } from "../utils/handleError";

export const setpuzzletime: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("setpuzzletime")
    .setDescription(
      `Configures the time of day the daily puzzle should be posted (in UTC)`
    )
    .addIntegerOption((option) =>
      option.setName("hour").setDescription("Hours (0-24)").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("minute")
        .setDescription("Minutes (0-60)")
        .setRequired(true)
    ),

  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const hour = interaction.options.get("hour")?.value;
      const minute = interaction.options.get("minute")?.value;

      const formattedUTCTime = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;

      let description = `The daily puzzle will be posted at **${formattedUTCTime} UTC**`;
      let embedColor = "#0099ff";
      let status = "Successfully Set Time";

      if (
        hour === undefined ||
        minute === undefined ||
        hour > 23 ||
        hour < 0 ||
        minute > 59 ||
        minute < 0
      ) {
        description = `Hours has to be in range of **0 and 23**
        Minutes has to be in range of **0 and 59**
        > Between **00:00** and **23:59**
  
        You entered:
        > \`Hours: ${hour}\`
        > \`Minutes: ${minute}\`
  
        Which translates to **${formattedUTCTime}**`;

        // This should never happen since hour and minute options are required,
        // so if it makes it to here, they both should be numbers
        if (hour === undefined || minute === undefined) {
          description = `Internal Server Error`;
        }

        embedColor = "#ff0000";
        status = "Failed to Set Time";
      } else {
        const result = await getChannelData(interaction.channelId);
        if (result === null) {
          const replyEmbed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Failed to Set Time")
            .setDescription(`Cannot set time for unregistered channel
          Please register with \`/register\``);

          interaction.editReply({ embeds: [replyEmbed] });
          return;
        }

        await updateChannelData(
          interaction.channelId,
          hour as number,
          minute as number
        );
      }

      const replyEmbed = new MessageEmbed()
        .setColor(embedColor as ColorResolvable)
        .setTitle(status)
        .setDescription(description);

      interaction.editReply({ embeds: [replyEmbed] });
    } catch (error) {
      errorHandler(error as Error);
    }
  },
};
