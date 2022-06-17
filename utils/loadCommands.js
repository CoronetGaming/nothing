const fs = require("node:fs");
const path = require("node:path");
const configF = require("../utils/config");

module.exports = async (client) => {
  const config = await configF();
  let fileArray = [];

  return new Promise((resolve, reject) => {
    if (!client) reject("Invalid client");

    const foldersPath = path.join(config.root, config.commands);
    const folders = fs.readdirSync(foldersPath);

    for (let folder of folders) {
      const filesPath = path.join(foldersPath, folder);
      const files = fs.readdirSync(filesPath);

      files.forEach((file) => {
        const commandPath = path.join(filesPath, file);
        const command = require(commandPath);

        if (!command.data.name)
          return console.error("Invalid command name, " + file.split(".")[0]);
        if (!command.data.description)
          console.warn(file.split(".")[0] + " has an invalid description");

        client.commands.set(command.data.name, command);
      });
    }

    resolve("Done");
  });
};
