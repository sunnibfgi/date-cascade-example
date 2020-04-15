const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

// config
module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: "main-[hash:8].js",
    path: path.resolve(__dirname, "build"),
    libraryTarget: 'umd'
  },

  mode: "production",

  module: {
    rules: [{
      test: /\.ts?$/,
      use: "ts-loader",
      exclude: /node_modules/
    }]
  },

  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin()
  ]
}