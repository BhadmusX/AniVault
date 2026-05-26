import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: {
    index: "./src/index.js",
    browse: "./src/browse.js",
    anime: "./src/anime.js",
    favorites: "./src/favorites.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },

  resolve: {
    fallback: {
      util: false,
      vm: false,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./browse.html",
      filename: "browse.html",
      chunks: ["browse"],
    }),
    new HtmlWebpackPlugin({
      template: "./anime.html",
      filename: "anime.html",
      chunks: ["anime"],
    }),
    new HtmlWebpackPlugin({
      template: "./favorites.html",
      filename: "favorites.html",
      chunks: ["favorites"],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
