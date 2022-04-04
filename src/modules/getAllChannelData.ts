import GuildModel, { GuildInterface } from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";

export const getAllChannelData = async (): Promise<
  GuildInterface[] | undefined
> => {
  try {
    const allChannelData = await GuildModel.find();

    return allChannelData;
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
