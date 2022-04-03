import GuildModel, { GuildInterface } from "../database/models/GuildModel";

export const removeChannelData = async (
  channelId: string
): Promise<GuildInterface | null | undefined> => {
  try {
    const filter = { channelId: channelId }

    let dbResult = await GuildModel.findOneAndDelete(filter);

    return dbResult;
  } catch (error) {
    console.error(error);
    return;
  }
}