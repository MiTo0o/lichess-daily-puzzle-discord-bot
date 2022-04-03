import { Document, model, Schema } from "mongoose";

export interface GuildInterface extends Document {
  channelId: string;
  dailyUpdateTime: {
    UCTHour: Number,
    UCTMinute: Number
  };
}

export const Guild = new Schema({
  channelId: String,
  dailyUpdateTime: {
    UCTHour: Number,
    UCTMinute: Number
  }
});

export default model<GuildInterface>("guild", Guild);