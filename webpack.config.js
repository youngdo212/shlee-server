const path = require('path');

module.exports = env => ({
  mode: env.NODE_ENV,
  entry: {
    project: './src/project/index.js',
  },
  output: {
    filename: 'javascripts/[name]/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgProps: { fill: 'currentColor' },
            },
          },
        ],
      },
    ],
  },
});
