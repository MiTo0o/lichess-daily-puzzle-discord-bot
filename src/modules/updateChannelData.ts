import GuildModel, { GuildInterface } from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";

export const updateChannelData = async (
  channelId: string,
  utcHour: number,
  utcMinute: number
): Promise<GuildInterface | undefined | null> => {
  try {
    const filter = { channelId: channelId };

    const writeObject = {
      dailyUpdateTime: {
        UCTHour: utcHour,
        UCTMinute: utcMinute,
      },
    };

    const dbResult = await GuildModel.findOneAndUpdate(filter, writeObject);

    return dbResult;
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
