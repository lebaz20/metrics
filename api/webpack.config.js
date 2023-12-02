// webpack.config.js
const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  target: 'node',
  entry: './index.ts', // Adjust the entry file accordingly
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/api'),
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
};
