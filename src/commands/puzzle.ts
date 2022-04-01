import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

const axios = require('axios');

export const puzzle: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('puzzle')
    .setDescription('Posts the daily chess puzzle by Lichess on-demand'),

  run: async (interaction) => {
    const response = await axios('https://lichess.org/api/puzzle/daily');

    const dailyPuzzleData = response.data;
    const dailyPuzzleUrl = `https://lichess.org/training/${dailyPuzzleData.puzzle.id}`;
    const dailyPuzzleImgUrl = `https://lichess1.org/training/export/gif/thumbnail/${dailyPuzzleData.puzzle.id}.gif`;
    const gameTimeControlAndType = `From game ${dailyPuzzleData.game.clock} • ${dailyPuzzleData.game.perf.name}`;
    const footerText = `Puzzle Rating: ${dailyPuzzleData.puzzle.rating}`;

    const dailyPuzzleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Lichess Daily Puzzle')
      .setURL(dailyPuzzleUrl)
      .setDescription(gameTimeControlAndType)
      .setImage(dailyPuzzleImgUrl)
      .setTimestamp()
      .setFooter({ text: footerText});
    interaction.channel?.send( {embeds: [dailyPuzzleEmbed]} )
  } 

};