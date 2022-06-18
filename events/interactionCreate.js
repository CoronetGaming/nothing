const baseEvent = require("../utils/structures/Event");

module.exports = class interactionCreateEvent extends baseEvent {
  constructor() {
    super("interactionCreate");
  }

  async run(client, interaction) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (command) {
        try {
          command.run(client, interaction);
        } catch (error) {
          console.error(error);
          return interaction.reply({
            content: "An error occured, while executing",
            epheremal: true,
          });
        }
      } else {
        return;
      }
    }
  }
};
