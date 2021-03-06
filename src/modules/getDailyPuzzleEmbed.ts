import { MessageEmbed } from "discord.js";
import axios from "axios";
import { errorHandler } from "../utils/handleError";

export const getDailyPuzzleEmbed = async (): Promise<
  MessageEmbed | undefined
> => {
  try {
    const response = await axios("https://lichess.org/api/puzzle/daily");

    const dailyPuzzleData = response.data;
    const dailyPuzzleUrl = `https://lichess.org/training/${dailyPuzzleData.puzzle.id}`;
    const dailyPuzzleImgUrl = `https://lichess1.org/training/export/gif/thumbnail/${dailyPuzzleData.puzzle.id}.gif`;
    const gameTimeControlAndType = `From game ${dailyPuzzleData.game.clock} • ${dailyPuzzleData.game.perf.name}`;
    const blackPlayerInfo = dailyPuzzleData.game.players[0].name;
    const whitePlayerInfo = dailyPuzzleData.game.players[1].name;
    const footerText = `Current Puzzle Rating: ${dailyPuzzleData.puzzle.rating}`;

    const dailyPuzzleEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Lichess Daily Puzzle")
      .setURL(dailyPuzzleUrl)
      .setDescription(gameTimeControlAndType)
      .setImage(dailyPuzzleImgUrl)
      .setTimestamp()
      .addFields(
        { name: "White", value: whitePlayerInfo, inline: true },
        { name: "Black", value: blackPlayerInfo, inline: true }
      )
      .setFooter({ text: footerText });

    return dailyPuzzleEmbed;
  } catch (error) {
    errorHandler(error as Error);
  }
};
