import { Document, model, Schema } from "mongoose";

export interface GuildInterface extends Document {
  channelId: string;
  guildId: string;
  dailyUpdateTime: {
    UCTHour: number;
    UCTMinute: number;
  };
}

export const Guild = new Schema({
  channelId: String,
  guildId: String,
  dailyUpdateTime: {
    UCTHour: Number,
    UCTMinute: Number,
  },
});

export default model<GuildInterface>("guild", Guild);
