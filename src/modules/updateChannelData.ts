import GuildModel, { GuildInterface } from "../database/models/GuildModel";

export const updateChannelData = async (
  channelId: string,
  utcHour: number,
  utcMinute: number
): Promise<GuildInterface | undefined | null> => {
  try {
    const filter = { channelId: channelId }

    const writeObject = {
      dailyUpdateTime: {
        UCTHour: utcHour,
        UCTMinute: utcMinute
      }
    }

    let dbResult = await GuildModel.findOneAndUpdate(
      filter,
      writeObject,
    );
    
    return dbResult;

  } catch (error) {
    console.error(error);
    return;
  }
}