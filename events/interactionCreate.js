module.exports = {
  name: "interactionCreate",
  async exec(client, interaction) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (command) {
        try {
          command.exec(client, interaction);
        } catch (error) {
          return interaction.reply({
            content: "An error occured, while executing",
            epheremal: true,
          });
        }
      } else {
        return;
      }
    }
  },
};
