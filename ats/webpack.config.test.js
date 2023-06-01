const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
  entry: {
    "bundle.test": "./src/app.test.js",
  },
  output: {
    publicPath: "/",
    asyncChunks: false,
    filename: "[name].js",
    clean: true,
  },
  target: "node",
  mode: "none",
});
