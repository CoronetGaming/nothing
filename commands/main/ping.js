const { SlashCommandBuilder } = require("@discordjs/builders");
const Command = require("../../utils/structures/Command");

module.exports = class LogCommand extends Command {
  // Class commands, coz why not (looks cooler lol)
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Returns application ping")
    );
  }

  async run(client, interaction) {
    return interaction.reply({
      content: client.ws.ping + "ms :ping_pong:",
    });
  }
};
