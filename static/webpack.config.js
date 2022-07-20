const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const withWebpackSafariExtension = require("react-native-safari-extension/build/static/withWebpackSafariExtension");

/**
 * Modify the default expo webpack config for the web extension to work. This
 * requires process.env.WEB_EXTENSION to be set to true.
 */
module.exports = async function (env, argv) {
  let config = await createExpoWebpackConfigAsync(env, argv);
  return process.env.WEB_EXTENSION
    ? withWebpackSafariExtension(config)
    : config;
};
