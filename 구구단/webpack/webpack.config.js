const path = require("path");

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
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "assets"),
    filename: "main.js",
  },
};
