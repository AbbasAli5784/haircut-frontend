const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    buffer: path.resolve(__dirname, "node_modules/buffer"),
    crypto: path.resolve(__dirname, "node_modules/crypto-browserify"),
    stream: path.resolve(__dirname, "node_modules/stream-browserify"),
    util: path.resolve(__dirname, "node_modules/util"),
  })
);
