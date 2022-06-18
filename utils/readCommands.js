const fs = require("node:fs");
const path = require("node:path");
const configF = require("../utils/config");

module.exports = async () => {
  const commandsArray = [];
  const config = await configF();

  return new Promise((resolve, reject) => {
    const foldersPath = path.join(config.root, config.commands);
    const folders = fs.readdirSync(foldersPath);

    for (let folder of folders) {
      const filesPath = path.join(foldersPath, folder);
      const files = fs.readdirSync(filesPath);

      files.forEach((file) => {
        const commandPath = path.join(filesPath, file);
        const commandFile = require(commandPath);

        const command = new commandFile();

        if (!command.data) reject("Invalid command data");

        commandsArray.push(command.data);

        resolve(commandsArray);
      });
    }
  });
};
