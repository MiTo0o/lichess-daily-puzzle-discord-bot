import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { setChannelData } from "../modules/setChannelData";

export const unregister: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('unregister')
    .setDescription('Sends daily puzzle everyday to this channel (default UTC midnight)'),

  run: async (interaction) => {

    await interaction.deferReply();
    const xd = await setChannelData(interaction.channelId);

    interaction.editReply('xd')
  } 
};