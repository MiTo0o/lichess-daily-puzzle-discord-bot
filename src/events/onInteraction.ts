import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { errorHandler } from "../utils/handleError";

export const onInteraction = async (
  interaction: Interaction
): Promise<void> => {
  try {
    if (interaction.isCommand()) {
      for (const Command of CommandList) {
        if (interaction.commandName === Command.data.name) {
          await Command.run(interaction);
          break;
        }
      }
    }
  } catch (error) {
    errorHandler(error as Error);
  }
};
