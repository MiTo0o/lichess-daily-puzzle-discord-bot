import { Document, model, Schema } from "mongoose";

export interface GuildInterface extends Document {
  channelId: string;
  customTime: string
}

export const Guild = new Schema({
  channelId: String,
  customTime: String
});

export default model<GuildInterface>("guild", Guild);