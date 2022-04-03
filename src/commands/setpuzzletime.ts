import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";

export const setpuzzletime: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('setpuzzletime')
    .setDescription('Configures the time of day the daily puzzle should be posted (in UTC)'),

  run: async (interaction) => {

    await interaction.deferReply();
    interaction.editReply('xd')

  } 

};