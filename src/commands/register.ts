import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { setChannelData } from "../modules/setChannelData";

export const register: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Sends daily puzzle everyday to this channel (Defaults to registerd time)'),

  run: async (interaction) => {

    await interaction.deferReply();
    const xd = await setChannelData(interaction.channelId);
    console.log(xd)
    interaction.editReply('xd')
  } 
};