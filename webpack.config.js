const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    dashboard: './src/dashboard/index.js',
  },
  output: {
    filename: 'javascripts/[name]/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
}