import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { removeChannelData } from "../modules/removeChannelData";
import { MessageEmbed, ColorResolvable } from "discord.js";

export const unregister: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('unregister')
    .setDescription('Sends daily puzzle everyday to this channel (default UTC midnight)'),

  run: async (interaction) => {

    await interaction.deferReply();
    const result = await removeChannelData(interaction.channelId);

    let description = 'Successfully unregisterd, this channel will no longer receive daily chess puzzles';
    let embedColor = '#0099ff';
    let status = 'Success';

    if (result === null) {
      description = 'Failed to unregister, there is nothing to unregister';
      embedColor = '#ff0000';
      status = 'Failed'
    }

    const replyEmbed = new MessageEmbed()
      .setColor(embedColor as ColorResolvable)
      .setTitle(`Status: ${status}`)
      .setDescription(description)
      .setTimestamp()

    interaction.editReply( {embeds: [replyEmbed]} )
  } 
};