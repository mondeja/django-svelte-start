"use strict";

const fs = require("fs");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.NODE_ENV || "development";
const PROD = MODE === "production";

const buildEntries = function () {
  const entries = {},
    modulesPath = "./frontend/src/js",
    files = fs.readdirSync(modulesPath).filter((f) => f.endsWith(".js"));
  for (const f of files) {
    entries[f.split(".")[0]] = `${modulesPath}/${f}`;
  }
  return entries;
};

module.exports = {
  entry: buildEntries(),
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve("svelte/package.json")),
    },
    extensions: [".mjs", ".js", ".svelte", ".scss"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: path.join(__dirname, "frontend", "dist", "js"),
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              dev: !PROD,
            },
            emitCss: PROD,
            hotReload: !PROD,
          },
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devtool: PROD ? false : "source-map",
};
