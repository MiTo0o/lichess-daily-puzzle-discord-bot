import GuildModel, { GuildInterface } from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";

export const removeChannelData = async (
  channelId: string
): Promise<GuildInterface | null | undefined> => {
  try {
    const filter = { channelId: channelId };

    const dbResult = await GuildModel.findOneAndDelete(filter);

    return dbResult;
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
