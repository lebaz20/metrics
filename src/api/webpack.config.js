// webpack.config.js
const path = require('path');

module.exports = {
  entry: './index.ts', // Adjust the entry file accordingly
  output: {
    filename: 'bundle.js',
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
