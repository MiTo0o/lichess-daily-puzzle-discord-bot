import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { removeChannelData } from "../modules/removeChannelData";
import { MessageEmbed, ColorResolvable } from "discord.js";

export const unregister: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('unregister')
    .setDescription('Sends daily puzzle everyday to this channel (default UTC midnight)')

  // this comma separates data and run      
  ,
  run: async (interaction) => {

    await interaction.deferReply();
    const result = await removeChannelData(interaction.channelId);

    let description = 'This channel will no longer receive daily chess puzzles';
    let embedColor = '#0099ff';
    let status = 'Successfully unregistered';

    if (result === null) {
      description = `Cannot unregister a channel that isn't registered`;
      embedColor = '#ff0000';
      status = 'Failed to unregister'
    }

    const replyEmbed = new MessageEmbed()
      .setColor(embedColor as ColorResolvable)
      .setTitle(status)
      .setDescription(description)
      .setTimestamp()

    interaction.editReply( {embeds: [replyEmbed]} )
  } 
};