const fs = require("node:fs");
const path = require("node:path");
const configF = require("../utils/config");

module.exports = async (client) => {
  const config = await configF();

  return new Promise((resolve, reject) => {
    if (!client) reject("Invalid client");

    const eventsPath = path.join(config.root, config.events);
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);

      if (!event.name) reject("Invalid event name.");
      if (!event.run) reject("No run function, cannot execute event");
      client.on(event.name, (...args) => event.exec(client, ...args));
      resolve("Loaded events");
    }
  });
};
