const { ModuleFederationPlugin } = require("webpack").container;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index",
  output: {
    publicPath: "auto",
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "job_editor",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/app",
        "./hook": "./src/hook",
        "./lazy": "./src/lazy-demo",
        "./lazy-helper": "./src/lazy-helper",
      },
      shared: {
        react: {
          requiredVersion: "16.9.0",
          singleton: true,
        },
        "react-dom": {
          requiredVersion: "16.9.0",
          singleton: true,
        },
      },
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
