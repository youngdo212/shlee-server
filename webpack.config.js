const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  mode: env.NODE_ENV,
  entry: {
    dashboard: './src/dashboard/index.js',
  },
  output: {
    filename: 'javascripts/[name]/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
});
