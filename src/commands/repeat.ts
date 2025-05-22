import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const cooldown = 5;
export const data = new SlashCommandBuilder()
  .setName("repeat")
  .setDescription("Repite el texto que le digas")
  .addStringOption((option) =>
    option
      .setName("mensaje")
      .setDescription("El texto a repetir")
      .setRequired(true),
  );

export async function execute(interaction: CommandInteraction) {
  const response = interaction.options.getString("mensaje");
  return interaction.reply(response);
}
