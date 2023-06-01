const { ModuleFederationPlugin } = require("webpack").container;

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
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/app",
      },
      shared: {
        react: {
          requiredVersion: "16.14.0",
          singleton: true,
        },
        "react-dom": {
          requiredVersion: "16.14.0",
          singleton: true,
        },
      },
    }),
  ],
};
