const { SlashCommandBuilder } = require("@discordjs/builders");
const Command = require("../../utils/structures/Command");

module.exports = class PingCommand extends Command {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Returns application ping")
    );
  }

  async run(client, interaction) {
    return this.success(
      interaction,
      "Current Ping",
      "Current bot ping is: " + client.ws.ping + "ms :ping_pong:",
      undefined
    );
  }
};
