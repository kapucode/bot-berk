const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

module.exports = (client) => {
  try {
    const commandsPath = path.join(__dirname, "../../src/commands");

    fs.readdirSync(commandsPath)
      .forEach((subFolder) => {

        const subFolderPath = path.join(commandsPath, subFolder);

        fs.readdirSync(subFolderPath)
          .forEach((file) => {

            const filePath = path.join(subFolderPath, file);

            const command = require(filePath);

            client.commands.set(command.name?.toLowerCase(), command);
            command.aliases?.forEach(a => client.aliases.set(a?.toLowerCase(), command));
          });
      });

    console.log("COMMANDS carregados!");

  } catch (err) {
    console.log(err);
  }
};