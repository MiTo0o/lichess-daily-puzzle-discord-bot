import { CommandInterface } from "../interfaces/Command";
import { puzzle } from "./puzzle";
import { register } from "./register";
import { setpuzzletime } from "./setpuzzletime";
import { unregister } from "./unregister";
import { help } from "./help";

export const CommandList: CommandInterface[] = [
  puzzle,
  register,
  unregister,
  setpuzzletime,
  help,
];
