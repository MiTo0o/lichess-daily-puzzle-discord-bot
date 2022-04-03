import GuildModel, { GuildInterface } from "../database/models/GuildModel";

export const getAllChannelData = async (): Promise<GuildInterface[] | undefined> => {
  try {
    const allChannelData = await GuildModel.find();

    return allChannelData;
  } catch (error) {
    console.error(error);
    return;
  }
}