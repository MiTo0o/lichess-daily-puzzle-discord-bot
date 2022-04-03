import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { setChannelData } from "../modules/setChannelData";
import { MessageEmbed, ColorResolvable } from "discord.js";

export const register: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Sends daily puzzle everyday to this channel (Defaults to registerd time)'),

  run: async (interaction) => {

    await interaction.deferReply();



    const currentDateTime = new Date()
    const currnetUTCHour = currentDateTime.getUTCHours();
    const currnetUTCMinute = currentDateTime.getUTCMinutes();
    
    let description = `Successfully registerd 
    The daily puzzle will be posted at **${currnetUTCHour}:${currnetUTCMinute} UTC**
    If you want to change this use the \`/setpuzzletime\` command`;
    let embedColor = '#0099ff';
    let status = 'Success';

    const result = await setChannelData(
      interaction.channelId, 
      currnetUTCHour, 
      currnetUTCMinute
    );

    // If result is not null, it means the server is already registered
    if (result !== null) {
      description = 'This channel is already registered\n To change the time of day for the daily puzzle use \`/setpuzzletime\`';
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