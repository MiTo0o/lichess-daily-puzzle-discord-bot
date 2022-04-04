import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { getDailyPuzzleEmbed } from "../modules/getDailyPuzzleEmbed";
import { errorHandler } from "../utils/handleError";
import { MessageEmbed } from "discord.js";

export const puzzle: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName("puzzle")
    .setDescription("Posts the daily chess puzzle by Lichess on-demand"),

  // this comma separates data and run
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const dailyPuzzleEmbed = await getDailyPuzzleEmbed();

      interaction.editReply({ embeds: [dailyPuzzleEmbed as MessageEmbed] });
    } catch (error) {
      errorHandler(error as Error);
    }
  },
};
