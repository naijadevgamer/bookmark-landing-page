// webpack.config.js
import { resolve } from "path";

export const entry = "./src/index.js";
export const output = {
  filename: "main.js",
  path: resolve(__dirname, "dist"),
};
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    },
  ],
};
export const plugins = [];
export const mode = "development";
