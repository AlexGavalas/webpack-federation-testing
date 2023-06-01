const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: "dist",
    port: 3001,
  },
  resolve: {
    fallback: {
      path: false,
    },
  },
  output: {
    publicPath: "auto",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
