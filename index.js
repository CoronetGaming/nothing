const bot = require("./lib/Bot");
const configF = require("./utils/config");

(async () => {
  const config = await configF();

  const discordBot = new bot({
    token: config.token,
    onReadyMessage: "{username} has logged in",
  });

  discordBot.start();
})();
