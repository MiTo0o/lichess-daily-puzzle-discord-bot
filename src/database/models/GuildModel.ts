import { Document, model, Schema } from "mongoose";

export interface GuildInterface extends Document {
  discordId: string;
  round: number;
  day: number;
  timestamp: number;
}

export const Guild = new Schema({
  discordId: String,
  round: {
    type: Number,
    default: 1,
  },
  day: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

export default model<GuildInterface>("guild", Guild);