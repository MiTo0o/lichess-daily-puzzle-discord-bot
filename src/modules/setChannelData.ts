import GuildModel, { GuildInterface } from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";

export const setChannelData = async (
  channelId: string,
  utcHour: number,
  utcMinute: number
): Promise<GuildInterface | undefined | null> => {
  try {
    const filter = { channelId: channelId };

    const writeObject = {
      channelId: channelId,
      dailyUpdateTime: {
        UCTHour: utcHour,
        UCTMinute: utcMinute,
      },
    };

    const dbResult = await GuildModel.findOneAndUpdate(
      filter,
      { $setOnInsert: writeObject },
      { upsert: true }
    );

    // returns null if channel was not previously registered
    // returns the document if the channel is already registered
    return dbResult;
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
