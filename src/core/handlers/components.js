const fs = require("fs");
const path = require("path");

function readFiles(dir) {
  let results = [];

  const files = fs.readdirSync(dir, {
    withFileTypes: true
  });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      results.push(...readFiles(filePath));
    } else if (file.name.endsWith(".js")) {
      results.push(filePath);
    }
  }

  return results;
}

module.exports = (client) => {
  try {
    const componentsPath =
      path.join(__dirname, "../../components");

    const files = readFiles(componentsPath);

    for (const filePath of files) {
      const component = require(filePath);

      if (!component?.name) continue;

      client.components.set(
        component.name,
        component
      );

      client.debug(
        `COMPONENT set: ${component.name}`
      );
    }

    client.info("COMPONENTS carregados!");
  } catch (err) {
    client.error(err);
  }
};