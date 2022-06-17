// A very basic command for testing.

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns websocket ping"),
  async exec(client, interaction) {
    return interaction.reply({
      content: client.ws.ping + "ms :ping_pong:",
    });
  },
};
