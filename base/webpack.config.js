const path = require("path");

module.exports = {
  mode: "development", // or production
  devtool: "eval",
  entry: "./client.js",
  output: {
    path: path.join(__dirname, "src"),
    filename: "app.js",
  },
};
