import GuildModel, { GuildInterface } from "../database/models/GuildModel";

export const setChannelData = async (
  channelId: string,
  utcTime?: string 
): Promise<GuildInterface | undefined> => {
  try {
    const filter = { channelId: channelId }

    const currentDateTime = new Date() 

    const writeObject = {
      channelId: channelId,
      dailyUpdateTime: {
        UCTHour: currentDateTime.getUTCHours(),
        UCTMinute: currentDateTime.getUTCMinutes()
      }
    }

    let doc = await GuildModel.findOneAndUpdate(filter, writeObject, {
      new: true,
      upsert: true
    });

    return doc;
  } catch (error) {
    console.error(error);
    return;
  }
}