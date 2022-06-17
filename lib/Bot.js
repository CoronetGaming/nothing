const { Client, Intents, Collection } = require("discord.js");
const commands = require("../utils/loadCommands");
const events = require("../utils/loadEvents");
const deployCommands = require("./commandsManager/deploy");
const path = require("node:path");

class Bot extends Client {
  constructor({ token, onReadyMessage, logging = true }) {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    this.deploy();

    this.token = token;
    this.logging = logging;

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
        if (this.logging) {
          console.log("Deploying commands has been completed");
        }
      })
      .catch(console.error);
  }

  loadCommands() {
    commands(this)
      .then(() => {
        if (this.logging) {
          console.log("Commands loaded");
        }
      })
      .catch(console.error);
  }

  loadEvents() {
    events(this)
      .then(() => {
        if (this.logging) {
          console.log("loaded events");
        }
      })
      .catch(console.error);
  }
}

module.exports = Bot;
