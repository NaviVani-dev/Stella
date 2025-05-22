import {
  ActionRowBuilder,
  CommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("introduce")
  .setDescription("Responde un cuestionario para presentarte ante el servidor");

export async function execute(interaction: CommandInteraction) {
  const modal = new ModalBuilder()
    .setCustomId("introduce")
    .setTitle("¡Presentate al servidor!");

  const nameInput = new TextInputBuilder()
    .setCustomId("nameInput")
    .setLabel("Nombre")
    .setMinLength(3)
    .setMaxLength(50)
    .setPlaceholder("ej. Furina")
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const nicknameInput = new TextInputBuilder()
    .setCustomId("nicknameInput")
    .setLabel("Apodo (o apodos)")
    .setMinLength(3)
    .setMaxLength(100)
    .setPlaceholder("ej. Furi, Fifi")
    .setRequired(true)
    .setStyle(TextInputStyle.Short);

  const firstRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      nameInput,
    );
  const secondRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      nicknameInput,
    );
  modal.addComponents(firstRow, secondRow);
  return interaction.showModal(modal);
}

export async function handleModalSubmit(interaction: ModalSubmitInteraction) {
  if (interaction.customId === "introduce") {
    const name = interaction.fields.getTextInputValue("nameInput");
    const nickname = interaction.fields.getTextInputValue("nicknameInput");
    await interaction.reply(`¡HOLI! Soy ${name}, mi apodo es ${nickname}.`);
  }
}
