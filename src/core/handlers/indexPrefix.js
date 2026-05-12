const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

module.exports = (client) => {
  try {
    const commandsPath = path.join(__dirname, "../../commands");

    fs.readdirSync(commandsPath)
      .forEach((subFolder) => {
        const subFolderPath = path.join(commandsPath, subFolder);

        fs.readdirSync(subFolderPath)
          .forEach((file) => {
            const filePath = path.join(subFolderPath, file);
            const command = require(filePath);

            client.commands.set(
              command.name?.toLowerCase(), 
              command
            )
            command.aliases?.forEach(a => 
              client.aliases.set(
                a?.toLowerCase(),
                command
              )
            );
            
            client.debug(`COMMAND set: ${JSON.stringify(command, null, 2)}`)
          });
      });

    client.info("COMMANDS carregados!");

  } catch (err) {
    client.error(err);
  }
};