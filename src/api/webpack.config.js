// webpack.config.js
const path = require('path');

module.exports = {
  target: 'node',
  entry: './index.ts', // Adjust the entry file accordingly
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/api')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
