const { Client, Intents, Collection } = require("discord.js");
const commands = require("../utils/loadCommands");
const events = require("../utils/loadEvents");
const deployCommands = require("./commandsManager/deploy");
const path = require("node:path");

class Bot extends Client {
  constructor({ token, onReadyMessage }) {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    this.deploy();

    this.token = token;

    this.commands = new Collection();

    this.loadCommands();
    this.loadEvents();

    this.on("ready", () => {
      if (onReadyMessage) {
        const message = onReadyMessage.replace(
          "{username}",
          this.user.username
        );

        console.log(message);
      } else {
        console.log("Bot has started");
      }
    });
  }

  start() {
    this.login(this.token);
  }

  getToken() {
    return this.token;
  }

  deploy() {
    deployCommands()
      .then(() => {
        console.log("Deploying commands has been completed");
      })
      .catch(console.error);
  }

  loadCommands() {
    commands(this)
      .then(() => {
        console.log("Commands loaded");
      })
      .catch(console.error);
  }

  loadEvents() {
    events(this)
      .then(() => {
        console.log("loaded events");
      })
      .catch(console.error);
  }
}

module.exports = Bot;
