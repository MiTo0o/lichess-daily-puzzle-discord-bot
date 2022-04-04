import { Guild } from "discord.js";
import { errorHandler } from "../utils/handleError";
import { deleteAllGuildChannels } from "../modules/deleteAllGuildChannels";

export const onGuildDelete = async (guild: Guild) => {
  try {
    await deleteAllGuildChannels(guild.id);
  } catch (error) {
    errorHandler(error as Error);
    return;
  }
};
