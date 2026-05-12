require('module-alias/register')

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const commands = [];

try {
  const slashPath = path.join(__dirname, "../../commandsSlash");

  const folders = fs.readdirSync(slashPath);

  folders.forEach((subFolder) => {

    const subFolderPath = path.join(slashPath, subFolder);

    const files = fs.readdirSync(subFolderPath);

    files
      .filter(file => file.endsWith(".js"))
      .forEach((file) => {

        const filePath = path.join(subFolderPath, file);

        const command = require(filePath);

        if (!command?.data) return;

        commands.push(command.data.toJSON());

      });

  });

} catch (err) {
  console.error(err);
}

const rest = new REST({ version: "10" })
  .setToken(process.env.BOT_TOKEN);

(async () => {

  try {
    
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(`✅ ${commands.length} SLASH carregado(s)!`);

  } catch (error) {
    console.error(error);
  }

})();