import GuildModel from "../database/models/GuildModel";
import { errorHandler } from "../utils/handleError";

export const deleteAllGuildChannels = async (
  guildId: string
): Promise<number | undefined> => {
  try {
    // returns with object that looks like {deletedCount: 3}
    const { deletedCount } = await GuildModel.deleteMany({ guildId: guildId });

    return deletedCount;
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
