const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

module.exports = (client) => {
  try {
    const slashPath = path.join(__dirname, "../../commandsSlash");
    const folders = fs.readdirSync(slashPath);

    folders.forEach((subFolder) => {
      const subFolderPath = path.join(slashPath, subFolder);
      const files = fs.readdirSync(subFolderPath);

      files.forEach((file) => {
        if (!file.endsWith(".js")) return;

        const filePath = path.join(subFolderPath, file);
        const command = require(filePath);

        if (!command?.data) return;

        client.slashCommands.set(
          command.data.name, 
          command
        );
        
        client.debug(`SLASHCOMMAND set: ${JSON.stringify(command, null, 2)}`)
      });
    });

    client.info("SLASH COMMANDS carregados!");
  } catch (err) {
    client.error(err);
  }
};