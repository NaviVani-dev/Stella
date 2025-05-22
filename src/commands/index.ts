import { CommandInteraction, ModalSubmitInteraction } from "discord.js";
import * as introduce from "./introduce";
import * as ping from "./ping";
import * as repeat from "./repeat";

interface BotCommand {
  data: any;
  execute: (interaction: CommandInteraction) => Promise<any>;
  handleModalSubmit?: (interaction: ModalSubmitInteraction) => Promise<any>;
}

export const commands: { [key: string]: BotCommand } = {
  ping,
  repeat,
  introduce,
};
