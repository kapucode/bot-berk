const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

module.exports = (client) => {
  try {
    const slashPath = path.join(__dirname, "../../src/commandsSlash");

    const folders = fs.readdirSync(slashPath);

    folders.forEach((subFolder) => {

      const subFolderPath = path.join(slashPath, subFolder);

      const files = fs.readdirSync(subFolderPath);

      files.forEach((file) => {

        if (!file.endsWith(".js")) return;

        const filePath = path.join(subFolderPath, file);

        const cmd = require(filePath);

        if (!cmd?.data) return;

        client.slashCommands.set(cmd.data.name, cmd);

      });

    });

    console.log("SLASH COMMANDS carregados!");

  } catch (err) {
    console.log(err);
  }
};