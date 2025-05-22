import { REST, Routes } from "discord.js";
import { config } from "../config";
import { commands } from "./commands";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST().setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log("cargando comandos (/)...");
    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_APP_ID, guildId),
      { body: commandsData },
    );
    console.log("comandos cargados yayy");
  } catch (error) {
    console.error(error);
  }
}
