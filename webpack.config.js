const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  let config = await createExpoWebpackConfigAsync(env, argv);
  return process.env.WEB_EXTENSION
    ? withWebpackSafariExtension(config, 19006)
    : config;
};

function withWebpackSafariExtension(config, port) {
  // Modify the entry point
  const indexJsEntryIndex = config.entry.app.findIndex((entry) =>
    entry.includes("index.js")
  );
  config.entry.app[indexJsEntryIndex] = "./web-extension/index.js";
  // Add the web socket definitions to the DefinePlugin
  const definePluginIndex = config.plugins.findIndex(
    (p) => p.constructor.name === "DefinePlugin"
  );
  config.plugins[definePluginIndex].definitions = {
    ...config.plugins[definePluginIndex].definitions,
    "process.env.WDS_SOCKET_HOST": JSON.stringify("localhost"),
    "process.env.WDS_SOCKET_PORT": JSON.stringify(port),
    "process.env.WDS_SOCKET_PATH": JSON.stringify("/sockjs-node"),
  };
  return config;
}
