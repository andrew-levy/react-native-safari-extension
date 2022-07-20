const path = require("path");
const fs = require("fs");

function withWebpackSafariExtension(config, port) {
  // Modify the entry point
  const indexJsEntryIndex = config.entry.app.findIndex((entry) =>
    entry.includes("index.js")
  );
  config.entry.app[indexJsEntryIndex] = path.resolve("web-extension/index.js");

  // Add the web socket env vars to the DefinePlugin
  const definePluginIndex = config.plugins.findIndex(
    (p) => p.constructor.name === "DefinePlugin"
  );
  config.plugins[definePluginIndex].definitions = {
    ...config.plugins[definePluginIndex].definitions,
    "process.env.WDS_SOCKET_HOST": JSON.stringify("localhost"),
    "process.env.WDS_SOCKET_PORT": JSON.stringify(port),
    "process.env.WDS_SOCKET_PATH": JSON.stringify("/sockjs-node"),
  };

  // Modify the output
  config.output.path = path.resolve("./web-extension/public");
  config.output.filename = "static/js/[name].js";
  config.output.chunkFilename = "static/js/[name].chunk.js";

  // Remove unwanted plugins
  [
    "ExpoPwaManifestWebpackPlugin",
    "FaviconWebpackPlugin",
    "ApplePwaWebpackPlugin",
    "ChromeIconsWebpackPlugin",
    "HtmlWebpackPlugin",
    "CopyPlugin",
    "ManifestPlugin",
  ].forEach((plugin) => {
    config.plugins = config.plugins.filter(
      (p) => p.constructor.name !== plugin
    );
  });

  // Update the html file
  const html = fs.readFileSync(
    path.resolve("./web-extension/public/index.html"),
    "utf8"
  );

  if (config.mode === "production") {
    const withProdScripts = html.replace(
      /<body[^>]*>((.|[\n\r])*)<\/body>/im,
      `<body>
          <div id="root"></div>
          <script src="static/js/app.js"></script>
          <script src="static/js/runtime~app.js"></script>
          <script src="static/js/2.chunk.js"></script>
          <script src="static/js/app.chunk.js"></script>
        </body>`
    );

    fs.writeFileSync(
      path.resolve("./web-extension/public/index.html"),
      withProdScripts
    );
  } else {
    const withDevScripts = html.replace(
      /<body[^>]*>((.|[\n\r])*)<\/body>/im,
      `<body>
          <div id="root"></div>
          <script
            nonce="e60ed1dc-fe33-11ec-b939-0242ac120002"
            src="http://localhost:19006/static/js/app.js"
          ></script>
        </body>`
    );
    fs.writeFileSync(
      path.resolve("./web-extension/public/index.html"),
      withDevScripts
    );
  }

  // Modify CleanWebpackPlugin option
  const cleanWebpackPluginIndex = config.plugins.findIndex(
    (p) => p.constructor.name === "CleanWebpackPlugin"
  );
  if (config.plugins[cleanWebpackPluginIndex]) {
    config.plugins[cleanWebpackPluginIndex].option = path.resolve(
      "web-extension/public/index.html"
    );
  }
  return config;
}

module.exports = withWebpackSafariExtension;
