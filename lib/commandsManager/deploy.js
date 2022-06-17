const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const configF = require("../../utils/config");
const readCommands = require("../../utils/readCommands");

module.exports = async () => {
  const config = await configF();

  const rest = new REST({ version: "9" }).setToken(config.token);

  rest
    .put(Routes.applicationCommands(config.clientID), {
      body: await readCommands(),
    })
    .then(() => {})
    .catch((error) => {
      throw error;
    });
};
