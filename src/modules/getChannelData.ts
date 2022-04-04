import GuildModel, { GuildInterface } from "../database/models/GuildModel";

export const getChannelData = async (
  channelId: string
): Promise<GuildInterface | undefined | null> => {
  try {
    const filter = { channelId: channelId };
    const channelData = await GuildModel.findOne(filter);

    return channelData;
  } catch (error) {
    console.error(error);
    return;
  }
};
