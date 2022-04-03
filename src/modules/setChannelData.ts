import GuildModel, { GuildInterface } from "../database/models/GuildModel";

export const setChannelData = async (
  channelId: string,
  utcHour: number,
  utcMinute: number
): Promise<GuildInterface | undefined | null> => {
  try {
    const filter = { channelId: channelId }

    const writeObject = {
      channelId: channelId,
      dailyUpdateTime: {
        UCTHour: utcHour,
        UCTMinute: utcMinute
      }
    }

    let dbResult = await GuildModel.findOneAndUpdate(
      filter,
      { $setOnInsert: writeObject },
      { upsert: true }
    );
    
    // returns null if channel was not previously registered
    // returns the document if the channel is already registered
    return dbResult;

  } catch (error) {
    console.error(error);
    return;
  }
}