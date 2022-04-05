import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { CommandInterface } from "../interfaces/Command";
import { errorHandler } from "../utils/handleError";

export const help: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides information on using this bot."),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const helpEmbed = new MessageEmbed();
      helpEmbed.setTitle("Available Commands");

      // First parameter of embed.addField() is the title, second parameter is the description.
      helpEmbed.addField(
        "/puzzle",
        "Posts the daily chess puzzle by Lichess on-demand"
      );
      helpEmbed.addField(
        "/register",
        "Receive daily chess puzzles in this channel"
      );
      helpEmbed.addField(
        "/setpuzzletime",
        "Configures the time of day the daily puzzle should be posted (in UTC)"
      );
      helpEmbed.addField(
        "/unregister",
        "Stop receiving daily chess puzzles in this channel"
      );
      await interaction.editReply({ embeds: [helpEmbed] });
      return;
    } catch (error) {
      errorHandler(error as Error);
    }
  },
};
