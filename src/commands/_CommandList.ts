import { CommandInterface } from "../interfaces/Command";
import { puzzle } from "./puzzle";
import { register } from "./register";
import { setpuzzletime } from "./setpuzzletime";
import { unregister } from "./unregister";

export const CommandList: CommandInterface[] = [
  puzzle,
  register,
  unregister,
  setpuzzletime
];