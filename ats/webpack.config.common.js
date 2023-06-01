const { ModuleFederationPlugin } = require("webpack").container;

/** @type {import('webpack').Configuration} */
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        'job_editor': "job_editor@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: {
          eager: true,
          requiredVersion: "16.14.0",
          singleton: true,
        },
        "react-dom": {
          eager: true,
          requiredVersion: "16.14.0",
          singleton: true,
        },
      },
    }),
  ],
};
