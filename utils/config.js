module.exports = async () => {
  return new Promise((resolve, reject) => {
    try {
      const configFile = require("../config");

      resolve(configFile);
    } catch {
      try {
        const configFile = require("../config/config.js");

        resolve(configFile);
      } catch (error) {
        reject("Unable to find config file.");
      }
    }
  });
};
