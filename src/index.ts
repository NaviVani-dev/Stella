import { Client } from "discord.js";
import { config } from "../config";
import { commands } from "./commands";
import { deployCommands } from "./deployCommands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", async () => {
  console.log("stella esta lista pa empezar");

  const guilds = await client.guilds.fetch();
  for (const [guildId] of guilds) {
    try {
      await deployCommands({ guildId });
      console.log(`stella recargo sus comandos en ${guildId}`);
    } catch (error) {
      console.error(error);
    }
  }
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const cmd = commands[interaction.commandName as keyof typeof commands];
    if (cmd) {
      await cmd.execute(interaction);
    }
    return;
  }

  if (interaction.isModalSubmit()) {
    const commandName = interaction.customId;
    const cmd = commands[commandName as keyof typeof commands];
    if (cmd && cmd.handleModalSubmit) {
      await cmd.handleModalSubmit(interaction);
    }
    return;
  }
});

client.login(config.DISCORD_TOKEN);

const cleanup = async () => {
  console.log("stella esta yendo a mimir...");
  await client.destroy();
  process.exit(0);
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
