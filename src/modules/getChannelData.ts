import GuildModel, { GuildInterface } from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";

export const getChannelData = async (
  channelId: string
): Promise<GuildInterface | undefined | null> => {
  try {
    const filter = { channelId: channelId };
    const channelData = await GuildModel.findOne(filter);

    return channelData;
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
