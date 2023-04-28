const path = require('path');
const Webpack = require('webpack');

/**
 * @type { Webpack.Configuration }
 */
const config = {
  mode: 'none', //  "development" | "production" | "none"
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    mainFields: ['module', 'main'],
  },
};

module.exports = config;
