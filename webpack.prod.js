import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WorkboxPlugin from "workbox-webpack-plugin";

export default {
  mode: "production",
  entry: "./src/client/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/views/index.html",
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
};
