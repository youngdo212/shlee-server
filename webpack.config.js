const path = require('path');

module.exports = (env) => ({
  mode: env.NODE_ENV,
  entry: {
    dashboard: './src/dashboard/index.js',
    project: './src/project/index.js',
  },
  output: {
    filename: 'javascripts/[name]/bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
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
