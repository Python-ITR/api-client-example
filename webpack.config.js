const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(jpe?g|png|svg)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(ejs)$/i,
        use: ["raw-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "./"),
    compress: false,
    port: 1234,
    proxy: {
      "/api": "http://localhost:9999",
    },
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: ["node_modules"],
  },
};
