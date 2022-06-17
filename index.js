const bot = require("./lib/Bot");
const configF = require("./utils/config");

(async () => {
  const config = await configF();

  const discordBot = new bot({
    token: config.token, // Bot token for logging in.
    onReadyMessage: "{username} has logged in", // On ready message, {username} get's replaced with bot's real name.
    logging: true, // Default is true, set it to false to stop logging
  });

  discordBot.start();
})();
