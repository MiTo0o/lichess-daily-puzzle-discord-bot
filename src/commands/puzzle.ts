import { CommandInterface } from "../interfaces/Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

const axios = require('axios');

export const puzzle: CommandInterface = {
  data: new SlashCommandBuilder()
    .setName('puzzle')
    .setDescription('Posts the daily chess puzzle by Lichess on-demand'),

  run: async (interaction) => {
    await interaction.deferReply();
    const response = await axios('https://lichess.org/api/puzzle/daily');

    const dailyPuzzleData = response.data;
    const dailyPuzzleUrl = `https://lichess.org/training/${dailyPuzzleData.puzzle.id}`;
    const dailyPuzzleImgUrl = `https://lichess1.org/training/export/gif/thumbnail/${dailyPuzzleData.puzzle.id}.gif`;
    const gameTimeControlAndType = `From game ${dailyPuzzleData.game.clock} • ${dailyPuzzleData.game.perf.name}`;
    const blackPlayerInfo = dailyPuzzleData.game.players[0].name;
    const whitePlayerInfo = dailyPuzzleData.game.players[1].name;
    // const descriptionBody = [
    //   gameTimeControlAndType,
    //   blackPlayerInfo,
    //   whitePlayerInfo
    // ].join('\n');
    const footerText = `Current Puzzle Rating: ${dailyPuzzleData.puzzle.rating}`;

    const dailyPuzzleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Lichess Daily Puzzle')
      .setURL(dailyPuzzleUrl)
      .setDescription(gameTimeControlAndType)
      .setImage(dailyPuzzleImgUrl)
      .setTimestamp()
      .addFields(
        { name: 'White', value: whitePlayerInfo, inline: true },
        { name: 'Black', value: blackPlayerInfo, inline: true },
      )
      .setFooter({ text: footerText});

    interaction.editReply( {embeds: [dailyPuzzleEmbed]} )
  } 

};