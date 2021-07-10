const path = require("path");
const refreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development", // or production
  devtool: "eval",
  entry: "./client.js",
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["> 5% in KR"],
                  },
                },
              ],
              "@babel/preset-react",
            ],
            plugins: ["react-refresh/babel"],
          },
        },
      },
    ],
  },

  plugins: [new refreshWebpackPlugin()],

  output: {
    path: path.join(__dirname, "assets"),
    filename: "main.js",
    publicPath: "/assets/",
  },
  devServer: {
    publicPath: "/assets/",
    hot: true,
  },
};
