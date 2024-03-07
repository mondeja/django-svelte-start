"use strict";

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const MODE = process.env.NODE_ENV || "development";
const PROD = MODE === "production";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildEntries = async () => {
  const entries = {},
    modulesPath = "./frontend/src/js",
    moduleFiles = (await fs.readdir(modulesPath)).filter((f) => f.endsWith(".js"));
  for (const f of moduleFiles) {
    entries[f.split(".")[0]] = `${modulesPath}/${f}`;
  }
  return entries;
};

export default {
  entry: await buildEntries(),
  resolve: {
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
